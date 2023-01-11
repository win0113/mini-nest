import { Controller } from "../../src/decorator/controller";
import { Injectable } from "../../src/decorator/injectable";
import { Module } from "../../src/decorator/module";

@Injectable()
export class ServiceA {
  logA() {
    console.log("a");
  }
}

@Controller()
export class ControllerA {
  constructor(private readonly service: ServiceA) {}
  log() {
    this.service.logA();
  }
}

@Module({
  providers: [ServiceA],
  controllers: [ControllerA],
})
export class ModuleA {}
