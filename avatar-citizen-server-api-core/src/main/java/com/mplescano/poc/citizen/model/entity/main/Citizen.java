package com.mplescano.poc.citizen.model.entity.main;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.mplescano.poc.citizen.component.constraint.SwapiPlanet;
import com.mplescano.poc.citizen.model.entity.BaseEntity;

@Entity
@Table(name = "citizens")
public class Citizen extends BaseEntity {

    @Column
    @NotBlank
    @Size(max = 180)
    private String name;
    
    @Column
    @NotNull
    @Min(1)
    private Integer height;
    
    @Column
    @NotNull
    @Min(1)
    private Integer mass;
    
    @Column
    @NotBlank
    @Size(max = 100)
    private String hairColor;
    
    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;
    
    @Column
    @Size(min= 2, max = 100)
    @SwapiPlanet
    private String planet;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getMass() {
        return mass;
    }

    public void setMass(Integer mass) {
        this.mass = mass;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getPlanet() {
        return planet;
    }

    public void setPlanet(String planet) {
        this.planet = planet;
    }
    
    
}
