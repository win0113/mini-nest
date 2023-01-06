import { Injectable, InstallWrapper, Controller } from "../define";

export class Module {
  public readonly imports: Map<string, InstallWrapper<Module>>[];
  public readonly exports: Map<string, InstallWrapper<Injectable>>[];
  public readonly providers: Map<string, InstallWrapper<Injectable>>[];
  public readonly controllers: Map<string, InstallWrapper<Controller>>[];
  constructor() {}


  
}
