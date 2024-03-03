import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
    throw new Error('container root not found.');
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
