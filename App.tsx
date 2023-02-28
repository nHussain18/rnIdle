import React from "react"
import { View, Text } from "react-native"
import { Provider } from "react-redux"
import RootNavigation from "./src/navigation"
import { store } from "./src/store"

const App = () => {

    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    )

}
export default App