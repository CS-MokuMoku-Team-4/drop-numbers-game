import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import Home from '@/pages';
import myAppReducer from '../src/store/myApp';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      basePath: '',
      isReady: true,
    };
  },
}));

describe('Home', () => {
  it('renders a heading', () => {
    const store = configureStore({
      reducer: {
        myApp: myAppReducer,
      },
      // you may also initialize the state
      // preloadedState: {}
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    const button = screen.getByRole('button', {
      name: /GAME START/i,
    });

    expect(button).toBeInTheDocument();
  });
});
