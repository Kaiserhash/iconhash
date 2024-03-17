import React, { useState, useEffect } from 'react';
import {Form, Input, Slider} from "antd";
import PropTypes from "prop-types";
import {styled} from "frontity";
import {theme} from "../../../constants/theme";

const InputContainers = styled.div`
  display: grid;
  grid-template-columns: 130px 16px 130px;
  align-items: center;
  grid-gap: 14px;
`;

const DecoratedItem = styled.div`
  width: 100%;
  height: 2px;
  background: #89A0B8;
  border-radius: 15px;
`;

const CustomFormItem = styled(Form.Item)`
  margin-bottom: 0;
  & .ant-input-group-wrapper {
    width: 100% !important;
  }
  & .ant-input-group-addon {
    background: none;
    border: none;
    color: var(--Tertiary, #89A0B8);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    padding: 0;
    margin: 0;
  }
  & .ant-input {
    border: none !important;
    display: block;
    outline: none !important;
    width: 100%;
    background: transparent;
    padding: 0;
    margin: 0;
  }
  & .ant-input-wrapper {
    padding: 12px;
    border-radius: 11px;
    background: #F9FAFB;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    grid-gap: 5px;
  }
`;

const CustomSlider = styled(Slider)`
  &  .ant-slider-handle::after {
    width: 4px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid #FFF;
    background: ${theme.colors.blue};
    box-shadow: 0px 2px 6px 0px rgba(29, 35, 91, 0.36);
  }
  & .ant-slider-track {
    background: ${theme.colors.blue};
  }
`



const RangeInput = ({
                        defaultRange = [0,0],
                        form,
                        minInputName = 'minInput',
                        maxInputName = 'maxInput',
                        rangeInputName = 'range'
}) => {
    useEffect(() => {
        form.setFieldsValue({
            [rangeInputName]: defaultRange,
            [minInputName]: defaultRange[0],
            [maxInputName]: defaultRange[1],
        });
    }, [defaultRange]);
    const handleSliderChange = value => {
        form.setFieldsValue({
            [minInputName]: value[0],
            [maxInputName]: value[1],
            [rangeInputName]: value,
        });
    };

    const handleInputChange = (name, value) => {
        const range = form.getFieldValue(rangeInputName);
        if (name === minInputName && +value >= range[1]) {
            return;
        }
        if (name === maxInputName && +value <= range[0]) {
            return;
        }
        form.setFieldsValue({
            [name]: +value ? parseFloat(+value) : 0,
        });
        form.setFieldsValue({
            [rangeInputName]: [form.getFieldValue(minInputName) || 0, form.getFieldValue(maxInputName) || 0],
        });
    };
    return (
        <>
            <InputContainers>
                <CustomFormItem name={minInputName}>
                    <Input
                        type="number"
                        min={defaultRange[0]}
                        max={defaultRange[1] - 1}
                        addonBefore="from"
                        onChange={e => handleInputChange(minInputName, e.target.value)}
                    />
                </CustomFormItem>
                <DecoratedItem />
                <CustomFormItem name={maxInputName}>
                    <Input
                        type="number"
                        min={defaultRange[0] + 1}
                        max={defaultRange[1]}
                        addonBefore="to"
                        onChange={e => handleInputChange(maxInputName, e.target.value)}
                    />
                </CustomFormItem>
            </InputContainers>
            <Form.Item name={rangeInputName}>
                <CustomSlider
                    min={defaultRange[0]}
                    max={defaultRange[1]}
                    range
                    onChange={handleSliderChange}
                />
            </Form.Item>
        </>
    )
}


RangeInput.propTypes = {
    defaultRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    form: PropTypes.object.isRequired,
    minInputName: PropTypes.string.isRequired,
    maxInputName: PropTypes.string.isRequired,
    rangeInputName: PropTypes.string.isRequired,
}


export default RangeInput;