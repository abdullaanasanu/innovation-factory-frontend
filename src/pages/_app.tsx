import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
