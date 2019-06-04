import { isAuthenticated } from '@mid';
import {
  filesAll,
  filesSingle,
  filesCreate,
  filesUpdate,
  filesDelete,
  myfiles,
  userfiles,
  filterfiles,
  filesCategory
} from './controller';

export const baseUrl = '/api/files';

export const routes = [
  {
    method: 'GET',
    route: '/category',
    handlers: [
      filesCategory
    ]
  },
  {
    method: 'GET',
    route: '/category/:filter',
    handlers: [
      filterfiles
    ]
  },
  {
    method: 'GET',
    route: '/user/:user',
    handlers: [
      userfiles
    ]
  },
  {
    method: 'GET',
    route: '/my',
    handlers: [
      isAuthenticated,
      myfiles
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      filesAll
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      filesSingle
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      isAuthenticated,
      filesUpdate
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      isAuthenticated,
      filesDelete
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      isAuthenticated,
      filesCreate
    ]
  }
];
