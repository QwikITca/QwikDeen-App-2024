import { createContext } from "react";

//credential context
export const CredentialsContext = createContext({storeCredentials: {}, setStoreCredentials: () => {}})

//3 wellcome page
export const WellcomeContext = createContext({storeWellcome: {}, setStoreWellcome: () => {}})

// check context
export const UserContext = createContext({testCredentials: {}, setTestCredentials: () => {}})
