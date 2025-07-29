import { createContext } from "preact";
import { ConfigOptions } from "../interface";

export const OptionsContext = createContext<ConfigOptions>(undefined);
