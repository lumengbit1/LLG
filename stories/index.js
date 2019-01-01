import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from '../src/components/Header/Header'

storiesOf('Header', module)
  .add('Header', () => <Header testSaga={{ message: 'my header' }} />)
