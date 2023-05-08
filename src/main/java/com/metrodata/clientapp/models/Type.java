package com.metrodata.clientapp.models;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Type {

    private Integer id;

    @NotBlank(message = "Invalid Name: Empty Name")
    private String name;
    
}
