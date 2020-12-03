# beartnt Places-to-Stay Module

## Table of Contents

1. [CRUD API](#CRUD)
2. [Installation](#Installing)

## CRUD API

*The below URL's should be prefixed with /api*
Action | Method | URL
-------|--------|----
Create a new related listing for a listing | PUT | /more/listings/:id/
Get related listings for a listing | GET | /more/listings/:id
Update listings list in user's favorites | PUT | /more/users/:id/:listname/:lid
Delete a listing from related listings | DELETE | /more/listings/:lid/relatedListings/:rid

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

