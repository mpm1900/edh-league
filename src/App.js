import React from 'react'
import {Client as Styletron} from 'styletron-engine-atomic'
import {Provider as StyletronProvider} from 'styletron-react'
import {LightTheme, BaseProvider, styled} from 'baseui'
import PlayerList from './Pages/PlayerList/PlayerList'

const engine = new Styletron()

function App() {
    return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <PlayerList />
        </BaseProvider>
      </StyletronProvider>
    );
}

export default App