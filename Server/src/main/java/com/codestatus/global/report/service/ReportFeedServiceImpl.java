package com.codestatus.global.report.service;

import com.codestatus.domain.feed.entity.Feed;
import com.codestatus.domain.feed.service.FeedService;
import com.codestatus.domain.user.entity.User;
import com.codestatus.global.exception.BusinessLogicException;
import com.codestatus.global.exception.ExceptionCode;
import com.codestatus.global.report.entity.ReportFeed;
import com.codestatus.global.report.reporitory.ReportFeedRepository;
import com.codestatus.global.utils.CustomMailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ReportFeedServiceImpl implements ReportService<Feed>{
    @Value("${report.feed-alarm-count}")
    int feedAlarmCount;

    private final ReportFeedRepository reportFeedRepository;
    private final CustomMailSender customMailSender;
    private final FeedService feedService;

    @Override
    public void report(Feed targetFeed, User user) {
        targetFeed = feedService.findVerifiedFeed(targetFeed.getFeedId());

        Optional<ReportFeed> optionalReportFeed = reportFeedRepository.findByFeedAndUser(targetFeed, user);
        if (optionalReportFeed.isPresent()) throw new BusinessLogicException(ExceptionCode.DUPLICATE_REPORT_EXCEPTION);

        ReportFeed reportFeed = new ReportFeed();
        reportFeed.setFeed(targetFeed);
        reportFeed.setUser(user);
        reportFeedRepository.save(reportFeed);

        sendReportAlarm(targetFeed);
    }

    @Override
    public void sendReportAlarm(Feed targetFeed) {
        int reportCount = reportFeedRepository.countAllByFeed(targetFeed);
        if (reportCount >= feedAlarmCount) {
            customMailSender.sendReportAlarm(targetFeed.getFeedId(), targetFeed.getUser().getNickname(), "피드");
        }
    }
}
