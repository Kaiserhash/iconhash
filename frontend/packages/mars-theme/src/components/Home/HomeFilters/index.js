import {theme} from "../../../constants/theme";
import React, { useState,useMemo } from 'react';
import HomeFiltersWrapper from "../HomeFiltersWrapper";
import {styled} from "frontity";
import PropTypes from "prop-types";
import {Select, Checkbox, Form, Input, Button} from "antd";
import RangeInput from "../RangeInput";

const ItemContainer = styled.div`
  margin-bottom: 20px;
  @media (min-width: ${theme.screens.lg}) {
    margin-bottom: 16px;
  }
`;

const CustomLabel = styled.div`
  color: var(--Secondary, #68717A);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 7px;
`;

const CustomSelect = styled(Select)`
  & .ant-select-selector {
    border-radius: 11px;
    background: #F9FAFB !important;
    padding: 5px;
  }
  & .ant-select-selection-item-content {
    color: var(--Primary, #293BDC);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
`;

const CustomCheckboxGroup = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 10px;
  & .ant-checkbox-wrapper span {
    color: var(--22, #425160);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }
  & .ant-checkbox-inner {
    border-color: var(--text---dark, #1C252F) !important;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background: var(--text---dark, #1C252F) !important;
    color: #fff !important;
  }
`;

const SubmitButton = styled(Button)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 76px;
  background: var(--Primary, #293BDC);
  color: var(--White, #FFF);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  width: 100%;
  padding: 13px;
  outline: none;
  border: none;
`;

const ResetButton = styled(Button)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 76px;
  background: var(--light-2, #F7F7FA);
  color: var(--Secondary, #68717A);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  width: 100%;
  padding: 13px;
  margin-bottom: 7px;
  outline: none;
  border: none;
`;

const HomeFilters = ({
                         isMobile = false,
                         actions,
                         filtersList: {
                             city = [],
                             country = [],
                             eyesColor = [],
                             hairsColor = [],
                             height = [0,0],
                             profession = [],
                             weight = [0,0]
                         }
                     }) => {
    const [form] = Form.useForm();
    const selectedCountriesFilters = Form.useWatch('countryFilters', form);
    const selectedCitiesFilters = Form.useWatch('citiesFilters', form);
    const selectedProfessionsFilters = Form.useWatch('professionsFilters', form);
    const selectedEyesFilters = Form.useWatch('eyesFilters', form);
    const selectedHairsFilters = Form.useWatch('hairsFilters', form);
    const totalAppliedFilters = useMemo(() => [
        ...(selectedCountriesFilters ? selectedCountriesFilters: []),
        ...(selectedCitiesFilters ? selectedCitiesFilters: []),
        ...(selectedProfessionsFilters ? selectedProfessionsFilters: []),
        ...(selectedEyesFilters ? selectedEyesFilters: []),
        ...(selectedHairsFilters ? selectedHairsFilters: []),
    ].length,[selectedHairsFilters,selectedEyesFilters,selectedCountriesFilters,selectedCitiesFilters,selectedProfessionsFilters]);
    const countryOptions = useMemo(() => country.map(item => ({
        label: item,
        value: item
    })),[country]);
    const citiesOptions = useMemo(() => city.map(item => ({
        label: item,
        value: item
    })),[city]);
    const professionsOptions = useMemo(() => profession.map(item => ({
        label: item,
        value: item
    })),[profession]);
    const eyesColorsOptions = useMemo(() => eyesColor.map(item => ({
        label: item,
        value: item
    })),[eyesColor]);
    const hairsColorsOptions = useMemo(() => hairsColor.map(item => ({
        label: item,
        value: item
    })),[hairsColor]);
    const onFormReset = async () => {
        try {
            form.resetFields();
            await actions.homePage.resetFilters();
        } catch (e) {
            console.error(e);
        }
    }
    const onFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            await actions.homePage.acceptFilters(values);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <HomeFiltersWrapper totalAcceptedFilters={totalAppliedFilters} isMobile={isMobile}>
         <Form form={form} onFinish={onFormSubmit}>
             <ItemContainer>
                 <CustomLabel>Country</CustomLabel>
                 <Form.Item name="countryFilters">
                     <CustomSelect
                         mode="tags"
                         options={countryOptions}
                     />
                 </Form.Item>
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>City</CustomLabel>
                 <Form.Item name="citiesFilters">
                     <CustomSelect
                         mode="tags"
                         options={citiesOptions}
                     />
                 </Form.Item>
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>Professions</CustomLabel>
                 <Form.Item name="professionsFilters">
                    <CustomCheckboxGroup options={professionsOptions}  />
                 </Form.Item>
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>Weight</CustomLabel>
                 <RangeInput
                     form={form}
                     maxInputName="maxWeight"
                     minInputName="minWeight"
                     defaultRange={weight}
                     rangeInputName="weightFilters"
                 />
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>Height</CustomLabel>
                 <RangeInput
                     form={form}
                     maxInputName="maxHeight"
                     minInputName="minHeight"
                     defaultRange={height}
                     rangeInputName="heightFilters"
                 />
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>Eyes colors</CustomLabel>
                 <Form.Item name="eyesFilters">
                    <CustomCheckboxGroup options={eyesColorsOptions}  />
                 </Form.Item>
             </ItemContainer>
             <ItemContainer>
                 <CustomLabel>Hairs colors</CustomLabel>
                 <Form.Item name="hairsFilters">
                    <CustomCheckboxGroup options={hairsColorsOptions}  />
                 </Form.Item>
             </ItemContainer>
             <ResetButton onClick={onFormReset}>Clear filters</ResetButton>
             <SubmitButton  htmlType="submit">Apply filters</SubmitButton>
         </Form>
        </HomeFiltersWrapper>
    )
}

HomeFilters.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    filtersList: PropTypes.shape({
        city: PropTypes.arrayOf(PropTypes.string).isRequired,
        country: PropTypes.arrayOf(PropTypes.string).isRequired,
        eyesColor: PropTypes.arrayOf(PropTypes.string).isRequired,
        hairsColor: PropTypes.arrayOf(PropTypes.string).isRequired,
        height: PropTypes.arrayOf(PropTypes.number).isRequired,
        profession: PropTypes.arrayOf(PropTypes.string).isRequired,
        weight: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
}


export default HomeFilters