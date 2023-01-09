import "reflect-metadata";
import * as Factory from "../../src/factory";
import { ModuleA } from "./module";


function bootstrap(){
  Factory.create(ModuleA)
}

bootstrap()
