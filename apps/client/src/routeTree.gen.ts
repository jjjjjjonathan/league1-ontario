/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as CompetitionsIndexImport } from './routes/competitions/index'
import { Route as CompetitionsCompetitionIdIndexImport } from './routes/competitions/$competitionId/index'
import { Route as CompetitionsCompetitionIdTeamsTeamIdLayoutImport } from './routes/competitions/$competitionId/teams/$teamId/_layout'
import { Route as CompetitionsCompetitionIdTeamsTeamIdLayoutIndexImport } from './routes/competitions/$competitionId/teams/$teamId/_layout/index'
import { Route as CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Import } from './routes/competitions/$competitionId/teams/$teamId/_layout/under-23'
import { Route as CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Import } from './routes/competitions/$competitionId/teams/$teamId/_layout/under-20'

// Create Virtual Routes

const CompetitionsCompetitionIdTeamsTeamIdImport = createFileRoute(
  '/competitions/$competitionId/teams/$teamId',
)()

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

const CompetitionsCompetitionIdTeamsTeamIdRoute =
  CompetitionsCompetitionIdTeamsTeamIdImport.update({
    path: '/competitions/$competitionId/teams/$teamId',
    getParentRoute: () => rootRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdLayoutRoute =
  CompetitionsCompetitionIdTeamsTeamIdLayoutImport.update({
    id: '/_layout',
    getParentRoute: () => CompetitionsCompetitionIdTeamsTeamIdRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute =
  CompetitionsCompetitionIdTeamsTeamIdLayoutIndexImport.update({
    path: '/',
    getParentRoute: () => CompetitionsCompetitionIdTeamsTeamIdLayoutRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route =
  CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Import.update({
    path: '/under-23',
    getParentRoute: () => CompetitionsCompetitionIdTeamsTeamIdLayoutRoute,
  } as any)

const CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route =
  CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Import.update({
    path: '/under-20',
    getParentRoute: () => CompetitionsCompetitionIdTeamsTeamIdLayoutRoute,
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
    '/competitions/$competitionId/teams/$teamId': {
      id: '/competitions/$competitionId/teams/$teamId'
      path: '/competitions/$competitionId/teams/$teamId'
      fullPath: '/competitions/$competitionId/teams/$teamId'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdImport
      parentRoute: typeof rootRoute
    }
    '/competitions/$competitionId/teams/$teamId/_layout': {
      id: '/competitions/$competitionId/teams/$teamId/_layout'
      path: '/competitions/$competitionId/teams/$teamId'
      fullPath: '/competitions/$competitionId/teams/$teamId'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutImport
      parentRoute: typeof CompetitionsCompetitionIdTeamsTeamIdRoute
    }
    '/competitions/$competitionId/teams/$teamId/_layout/under-20': {
      id: '/competitions/$competitionId/teams/$teamId/_layout/under-20'
      path: '/under-20'
      fullPath: '/competitions/$competitionId/teams/$teamId/under-20'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Import
      parentRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutImport
    }
    '/competitions/$competitionId/teams/$teamId/_layout/under-23': {
      id: '/competitions/$competitionId/teams/$teamId/_layout/under-23'
      path: '/under-23'
      fullPath: '/competitions/$competitionId/teams/$teamId/under-23'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Import
      parentRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutImport
    }
    '/competitions/$competitionId/teams/$teamId/_layout/': {
      id: '/competitions/$competitionId/teams/$teamId/_layout/'
      path: '/'
      fullPath: '/competitions/$competitionId/teams/$teamId/'
      preLoaderRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutIndexImport
      parentRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutImport
    }
  }
}

// Create and export the route tree

interface CompetitionsCompetitionIdTeamsTeamIdLayoutRouteChildren {
  CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route
  CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route
  CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute
}

const CompetitionsCompetitionIdTeamsTeamIdLayoutRouteChildren: CompetitionsCompetitionIdTeamsTeamIdLayoutRouteChildren =
  {
    CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route:
      CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route,
    CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route:
      CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route,
    CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute:
      CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute,
  }

const CompetitionsCompetitionIdTeamsTeamIdLayoutRouteWithChildren =
  CompetitionsCompetitionIdTeamsTeamIdLayoutRoute._addFileChildren(
    CompetitionsCompetitionIdTeamsTeamIdLayoutRouteChildren,
  )

interface CompetitionsCompetitionIdTeamsTeamIdRouteChildren {
  CompetitionsCompetitionIdTeamsTeamIdLayoutRoute: typeof CompetitionsCompetitionIdTeamsTeamIdLayoutRouteWithChildren
}

const CompetitionsCompetitionIdTeamsTeamIdRouteChildren: CompetitionsCompetitionIdTeamsTeamIdRouteChildren =
  {
    CompetitionsCompetitionIdTeamsTeamIdLayoutRoute:
      CompetitionsCompetitionIdTeamsTeamIdLayoutRouteWithChildren,
  }

const CompetitionsCompetitionIdTeamsTeamIdRouteWithChildren =
  CompetitionsCompetitionIdTeamsTeamIdRoute._addFileChildren(
    CompetitionsCompetitionIdTeamsTeamIdRouteChildren,
  )

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/competitions': typeof CompetitionsIndexRoute
  '/competitions/$competitionId': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutRouteWithChildren
  '/competitions/$competitionId/teams/$teamId/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route
  '/competitions/$competitionId/teams/$teamId/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route
  '/competitions/$competitionId/teams/$teamId/': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/competitions': typeof CompetitionsIndexRoute
  '/competitions/$competitionId': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute
  '/competitions/$competitionId/teams/$teamId/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route
  '/competitions/$competitionId/teams/$teamId/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/competitions/': typeof CompetitionsIndexRoute
  '/competitions/$competitionId/': typeof CompetitionsCompetitionIdIndexRoute
  '/competitions/$competitionId/teams/$teamId': typeof CompetitionsCompetitionIdTeamsTeamIdRouteWithChildren
  '/competitions/$competitionId/teams/$teamId/_layout': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutRouteWithChildren
  '/competitions/$competitionId/teams/$teamId/_layout/under-20': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder20Route
  '/competitions/$competitionId/teams/$teamId/_layout/under-23': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutUnder23Route
  '/competitions/$competitionId/teams/$teamId/_layout/': typeof CompetitionsCompetitionIdTeamsTeamIdLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/competitions'
    | '/competitions/$competitionId'
    | '/competitions/$competitionId/teams/$teamId'
    | '/competitions/$competitionId/teams/$teamId/under-20'
    | '/competitions/$competitionId/teams/$teamId/under-23'
    | '/competitions/$competitionId/teams/$teamId/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/competitions'
    | '/competitions/$competitionId'
    | '/competitions/$competitionId/teams/$teamId'
    | '/competitions/$competitionId/teams/$teamId/under-20'
    | '/competitions/$competitionId/teams/$teamId/under-23'
  id:
    | '__root__'
    | '/'
    | '/competitions/'
    | '/competitions/$competitionId/'
    | '/competitions/$competitionId/teams/$teamId'
    | '/competitions/$competitionId/teams/$teamId/_layout'
    | '/competitions/$competitionId/teams/$teamId/_layout/under-20'
    | '/competitions/$competitionId/teams/$teamId/_layout/under-23'
    | '/competitions/$competitionId/teams/$teamId/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CompetitionsIndexRoute: typeof CompetitionsIndexRoute
  CompetitionsCompetitionIdIndexRoute: typeof CompetitionsCompetitionIdIndexRoute
  CompetitionsCompetitionIdTeamsTeamIdRoute: typeof CompetitionsCompetitionIdTeamsTeamIdRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CompetitionsIndexRoute: CompetitionsIndexRoute,
  CompetitionsCompetitionIdIndexRoute: CompetitionsCompetitionIdIndexRoute,
  CompetitionsCompetitionIdTeamsTeamIdRoute:
    CompetitionsCompetitionIdTeamsTeamIdRouteWithChildren,
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
        "/competitions/$competitionId/teams/$teamId"
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
    "/competitions/$competitionId/teams/$teamId": {
      "filePath": "competitions/$competitionId/teams/$teamId",
      "children": [
        "/competitions/$competitionId/teams/$teamId/_layout"
      ]
    },
    "/competitions/$competitionId/teams/$teamId/_layout": {
      "filePath": "competitions/$competitionId/teams/$teamId/_layout.tsx",
      "parent": "/competitions/$competitionId/teams/$teamId",
      "children": [
        "/competitions/$competitionId/teams/$teamId/_layout/under-20",
        "/competitions/$competitionId/teams/$teamId/_layout/under-23",
        "/competitions/$competitionId/teams/$teamId/_layout/"
      ]
    },
    "/competitions/$competitionId/teams/$teamId/_layout/under-20": {
      "filePath": "competitions/$competitionId/teams/$teamId/_layout/under-20.tsx",
      "parent": "/competitions/$competitionId/teams/$teamId/_layout"
    },
    "/competitions/$competitionId/teams/$teamId/_layout/under-23": {
      "filePath": "competitions/$competitionId/teams/$teamId/_layout/under-23.tsx",
      "parent": "/competitions/$competitionId/teams/$teamId/_layout"
    },
    "/competitions/$competitionId/teams/$teamId/_layout/": {
      "filePath": "competitions/$competitionId/teams/$teamId/_layout/index.tsx",
      "parent": "/competitions/$competitionId/teams/$teamId/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
