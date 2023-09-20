package com.codestatus.domain.category.mapper;

import com.codestatus.domain.category.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    default Category categoryIdToCategory(Long categoryId){
        Category category = new Category();
        category.setCategoryId(categoryId);
        return category;
    }
}
