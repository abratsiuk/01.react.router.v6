import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createRoutesFromElements,
    Route,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.css';
import Root, {
    loader as rootLoader,
    action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Root />,
//         errorElement: <ErrorPage />,
//         loader: rootLoader,
//         action: rootAction,
//         children: [
//             {
//                 errorElement: <ErrorPage />,
//                 children: [
//                     { index: true, element: <Index /> },
//                     {
//                         path: 'contacts/:contactId',
//                         element: <Contact />,
//                         loader: contactLoader,
//                         action: contactAction,
//                     },
//                     {
//                         path: 'contacts/:contactId/edit',
//                         element: <EditContact />,
//                         loader: contactLoader,
//                         action: editAction,
//                     },
//                     {
//                         path: 'contacts/:contactId/destroy',
//                         action: destroyAction,
//                         errorElement: <div>Oops! There was an error.</div>,
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

/*
jsx routes
And for our final trick, many folks prefer to configure their routes with JSX. 
You can do that with createRoutesFromElements. 
There is no functional difference between JSX or objects when configuring your routes, 
it's simply a stylistic preference.
*/
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<Root />}
            loader={rootLoader}
            action={rootAction}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />}>
                <Route
                    index
                    element={<Index />}
                />
                <Route
                    path='contacts/:contactId'
                    element={<Contact />}
                    loader={contactLoader}
                    action={contactAction}
                />
                <Route
                    path='contacts/:contactId/edit'
                    element={<EditContact />}
                    loader={contactLoader}
                    action={editAction}
                />
                <Route
                    path='contacts/:contactId/destroy'
                    action={destroyAction}
                />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
