/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CompetitionsIndexImport } from './routes/competitions/index'
import { Route as CompetitionsCompetitionIdIndexImport } from './routes/competitions/$competitionId/index'
import { Route as CompetitionsCompetitionIdTeamsTeamIdIndexImport } from './routes/competitions/$competitionId/teams/$teamId/index'
import { Route as CompetitionsCompetitionIdTeamsTeamIdUnder23Import } from './routes/competitions/$competitionId/teams/$teamId/under-23'
import { Route as CompetitionsCompetitionIdTeamsTeamIdUnder20Import } from './routes/competitions/$competitionId/teams/$teamId/under-20'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CompetitionsIndexRoute = CompetitionsIndexImport.update({
  path: '/competitions/',
  getParentRoute: () => rootRoute,
} as any)

const CompetitionsCompetitionIdIndexRoute =
  CompetitionsCompetitionIdIndexImport.update({
    path: '/competitions/$competitionId/',
    getParentRoute: () => rootRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdIndexRoute =
  CompetitionsCompetitionIdTeamsTeamIdIndexImport.update({
    path: '/competitions/$competitionId/teams/$teamId/',
    getParentRoute: () => rootRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdUnder23Route =
  CompetitionsCompetitionIdTeamsTeamIdUnder23Import.update({
    path: '/competitions/$competitionId/teams/$teamId/under-23',
    getParentRoute: () => rootRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdUnder20Route =
  CompetitionsCompetitionIdTeamsTeamIdUnder20Import.update({
    path: '/competitions/$competitionId/teams/$teamId/under-20',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/competitions/': {
      id: '/competitions/'
      path: '/competitions'
      fullPath: '/competitions'
      preLoaderRoute: typeof CompetitionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/competitions/$competitionId/': {
      id: '/competitions/$competitionId/'
      path: '/competitions/$competitionId'
      fullPath: '/competitions/$competitionId'
      preLoaderRoute: typeof CompetitionsCompetitionIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/competitions/$competitionId/teams/$teamId/under-20': {
      id: '/competitions/$competitionId/teams/$teamId/under-20'
      path: '/competitions/$competitionId/teams/$teamId/under-20'
      fullPath: '/competitions/$competitionId/teams/$teamId/under-20'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdUnder20Import
      parentRoute: typeof rootRoute
    }
    '/competitions/$competitionId/teams/$teamId/under-23': {
      id: '/competitions/$competitionId/teams/$teamId/under-23'
      path: '/competitions/$competitionId/teams/$teamId/under-23'
      fullPath: '/competitions/$competitionId/teams/$teamId/under-23'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdUnder23Import
      parentRoute: typeof rootRoute
    }
    '/competitions/$competitionId/teams/$teamId/': {
      id: '/competitions/$competitionId/teams/$teamId/'
      path: '/competitions/$competitionId/teams/$teamId'
      fullPath: '/competitions/$competitionId/teams/$teamId'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/competitions': typeof CompetitionsIndexRoute
  '/competitions/$competitionId': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdUnder20Route
  '/competitions/$competitionId/teams/$teamId/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdUnder23Route
  '/competitions/$competitionId/teams/$teamId': typeof CompetitionsCompetitionIdTeamsTeamIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/competitions': typeof CompetitionsIndexRoute
  '/competitions/$competitionId': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdUnder20Route
  '/competitions/$competitionId/teams/$teamId/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdUnder23Route
  '/competitions/$competitionId/teams/$teamId': typeof CompetitionsCompetitionIdTeamsTeamIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/competitions/': typeof CompetitionsIndexRoute
  '/competitions/$competitionId/': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdUnder20Route
  '/competitions/$competitionId/teams/$teamId/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdUnder23Route
  '/competitions/$competitionId/teams/$teamId/': typeof CompetitionsCompetitionIdTeamsTeamIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/competitions'
    | '/competitions/$competitionId'
    | '/competitions/$competitionId/teams/$teamId/under-20'
    | '/competitions/$competitionId/teams/$teamId/under-23'
    | '/competitions/$competitionId/teams/$teamId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/competitions'
    | '/competitions/$competitionId'
    | '/competitions/$competitionId/teams/$teamId/under-20'
    | '/competitions/$competitionId/teams/$teamId/under-23'
    | '/competitions/$competitionId/teams/$teamId'
  id:
    | '__root__'
    | '/'
    | '/competitions/'
    | '/competitions/$competitionId/'
    | '/competitions/$competitionId/teams/$teamId/under-20'
    | '/competitions/$competitionId/teams/$teamId/under-23'
    | '/competitions/$competitionId/teams/$teamId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CompetitionsIndexRoute: typeof CompetitionsIndexRoute
  CompetitionsCompetitionIdIndexRoute: typeof CompetitionsCompetitionIdIndexRoute
  CompetitionsCompetitionIdTeamsTeamIdUnder20Route: typeof CompetitionsCompetitionIdTeamsTeamIdUnder20Route
  CompetitionsCompetitionIdTeamsTeamIdUnder23Route: typeof CompetitionsCompetitionIdTeamsTeamIdUnder23Route
  CompetitionsCompetitionIdTeamsTeamIdIndexRoute: typeof CompetitionsCompetitionIdTeamsTeamIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CompetitionsIndexRoute: CompetitionsIndexRoute,
  CompetitionsCompetitionIdIndexRoute: CompetitionsCompetitionIdIndexRoute,
  CompetitionsCompetitionIdTeamsTeamIdUnder20Route:
    CompetitionsCompetitionIdTeamsTeamIdUnder20Route,
  CompetitionsCompetitionIdTeamsTeamIdUnder23Route:
    CompetitionsCompetitionIdTeamsTeamIdUnder23Route,
  CompetitionsCompetitionIdTeamsTeamIdIndexRoute:
    CompetitionsCompetitionIdTeamsTeamIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/competitions/",
        "/competitions/$competitionId/",
        "/competitions/$competitionId/teams/$teamId/under-20",
        "/competitions/$competitionId/teams/$teamId/under-23",
        "/competitions/$competitionId/teams/$teamId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/competitions/": {
      "filePath": "competitions/index.tsx"
    },
    "/competitions/$competitionId/": {
      "filePath": "competitions/$competitionId/index.tsx"
    },
    "/competitions/$competitionId/teams/$teamId/under-20": {
      "filePath": "competitions/$competitionId/teams/$teamId/under-20.tsx"
    },
    "/competitions/$competitionId/teams/$teamId/under-23": {
      "filePath": "competitions/$competitionId/teams/$teamId/under-23.tsx"
    },
    "/competitions/$competitionId/teams/$teamId/": {
      "filePath": "competitions/$competitionId/teams/$teamId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
