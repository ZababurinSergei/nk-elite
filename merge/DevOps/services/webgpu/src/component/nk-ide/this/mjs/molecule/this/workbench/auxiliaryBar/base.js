import { getBEMElement, getBEMModifier, prefixClaName, } from './../../../this/common/className';
export const defaultClassName = prefixClaName('auxiliaryBar');
export const containerClassName = getBEMElement(defaultClassName, 'container');
export const tabsClassName = getBEMElement(defaultClassName, 'tabs');
export const tabClassName = getBEMElement(tabsClassName, 'tab');
export const tabActiveClassName = getBEMModifier(tabClassName, 'active');