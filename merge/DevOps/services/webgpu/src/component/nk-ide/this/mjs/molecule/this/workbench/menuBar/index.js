import 'reflect-metadata';
import { connect } from './../../../this/react';
import MenuBar from './menuBar';
import { MenuBarService } from './../../../this/services';
import { container } from 'tsyringe';
import { MenuBarController } from './../../../this/controller/menuBar';
const menuBarService = container.resolve(MenuBarService);
const menuBarController = container.resolve(MenuBarController);
const MenuBarView = connect(menuBarService, MenuBar, menuBarController);
export { MenuBar, MenuBarView };