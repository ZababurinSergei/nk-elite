var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import { Controller } from './../../this/react/controller';
import { LayoutService } from './../../this/services';
import { LayoutEvents } from './../../this/model/workbench/layout';
let LayoutController = class LayoutController extends Controller {
    constructor() {
        super();
        this.onPaneSizeChange = (splitPanePos) => {
            this.layoutService.setPaneSize(splitPanePos);
        };
        this.onHorizontalPaneSizeChange = (horizontalSplitPanePos) => {
            this.layoutService.setHorizontalPaneSize(horizontalSplitPanePos);
        };
        this.onWorkbenchDidMount = () => {
            this.layoutService.emit(LayoutEvents.OnWorkbenchDidMount);
        };
        this.layoutService = container.resolve(LayoutService);
    }
    initView() { }
};
LayoutController = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], LayoutController);
export { LayoutController };