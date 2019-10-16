[![Build Status](https://travis-ci.org/misskelly/dab-of-colors-API.svg?branch=master)](https://travis-ci.org/misskelly/dab-of-colors-API)


# Dab of Colors : Back End

View the front end app (currently under construction!) at https://dab-of-colors.web.app/
Front end repo : https://github.com/misskelly/dab-of-colors


## Setup


```bash
psql

# then

CREATE DATABASE palette_picker;
CREATE DATABASE palette_picker_test;
\q
```

Run the migrations for your new DB's:
```
knex migrate:latest
knex migrate:latest --env=test
```

Then seed your db's:

```bash
knex seed:run  
knex seed:run --env=test
```

## Run the Server

To start the server, run:

```bash
npm start
```

## API Documentation:

Welcome to the Palette Picker API! This documentation should familiarize you with the resources available and how to consume them with HTTP requests.

A front-end application for Palette Picker is deployed to Heroku: https://pick-your-palette.herokuapp.com/

### Root URL
The Root URL for Palette Picker is `https://palette-picker-mfjk.herokuapp.com/api/v1` The documentation below requires prepending the Root URL to the endpoints in order to fulfill the requests.

### Projects Endpoints
The Projects endpoints provide information about all the Projects in Palette Picker or a specific Project. You can also create, update, or delete a Project.

#### Endpoints:
- `/projects` -- `GET` data for all Projects
- `/projects/:id` -- `GET` data for a specific Project 
- `/projects` -- `POST` add a new Project
- `/projects/:id` -- `PUT` edit an existing Project
- `/projects/:id` -- `DELETE` an existing Project

### Palettes Endpoints
The Palettes endpoints provide information about all the Palettes in Palette Picker or a specific Palette. You can also create, update, or delete a Palette.

#### Endpoints:
- `/palettes` -- `GET` data for all Palettes
- `/palettes/:id` -- `GET` data for a specific Palette 
- `/palettes` -- `POST` add a new Palette
- `/palettes/:id` -- `PUT` edit an existing Palette
- `/palettes/:id` -- `DELETE` an existing Palette
- `/search?palette_name=` -- `GET` a specific Palette by name

---

## GET `/projects`
This endpoint grabs all existing projects in the database.

#### Example Responses

##### Status: 200 OK

```
[
    {
        "project_id": 5,
        "project_name": "Fitness App",
        "created_at": "2019-05-09T14:30:12.804Z",
        "updated_at": "2019-05-09T14:30:12.804Z"
    },
    {
        "project_id": 4,
        "project_name": "Yoshi's Colors",
        "created_at": "2019-05-09T14:30:12.800Z",
        "updated_at": "2019-05-09T14:30:12.800Z"
    },
    {
        "project_id": 6,
        "project_name": "Louisa's Favorite Magentas",
        "created_at": "2019-05-10T20:59:55.362Z",
        "updated_at": "2019-05-10T20:59:55.362Z"
    }
]
```

## GET `/projects/:id`
This endpoint grabs an existing project in the database by id.

#### Example Responses

##### Status: 200 OK

```
[
    {
        "project_id": 6,
        "project_name": "Louisa's Favorite Magentas",
        "created_at": "2019-05-10T20:59:55.362Z",
        "updated_at": "2019-05-10T20:59:55.362Z"
    }
]
```

##### Status: 404 Not Found

```
{ "error": "Could not find project with id 66" }
```

## POST `/projects`
This endpoint adds a new project. 

### Request Body `application/json`
| Name | Type | Description | Required |
| --- | --- | --- | --- |
| project_name| string | Name of Project | yes |


#### Example Request Body
```
  { "project_name": "Bart's Colors" }
```

#### Example Responses:

##### Status: 200 OK
```
  { project_id: 6 }
```

##### Status: 422 Unprocessable Entity
```
{
    "error": "Missing required parameter. Expected format: { project_name: <String> }."
}
```

## PUT `/projects`
This endpoint updates an existing. 

### Request Body `application/json`
| Name | Type | Description | Required |
| --- | --- | --- | --- |
| project_id| integer | ID of Project | yes |
| palette_name| string | Name of Project | yes |


#### Example Request Body
```
  { "project_id": 6, "project_name": "Buffy's Palette" }
```

#### Example Responses:

##### Status: 200 OK
```
  { project_id: 6 }
```

##### Status: 422 Unprocessable Entity

```
{
    "error": "Missing required parameter. Expected format: { project_name: <String> }"
}
```
##### Status: 404 Not Found

```
{ "error": "Could not find a project with id 88." }
```
##################
## DELETE `/projects/:id`
Delete an existing project and all associated palettes

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- | 
| project_id| integer | ID of Project |
| project_name| string | Name of Project |


##### Status: 202 No Content

```
"Project successfully deleted"
```

##### Status: 404 Not Found

```
"Oh no, something bad happened and I could not delete the project: ReferenceError: projectId is not defined"
```

---

## GET `/palettes`
Retrieve data for all Palettes. 

#### Example Responses:

##### Status: 200 OK
```
[
 {
        "id": 4,
        "name": "Pinkalicious",
        "color_1": "#c814ff",
        "color_2": "#fcaee6",
        "color_3": "#0eb3c9",
        "color_4": "#d6ff35",
        "color_5": "#fce1bd",
        "project_id": 58,
        "created_at": "2019-10-14T20:34:57.020Z",
        "updated_at": "2019-10-14T20:34:57.020Z"
    },
    {
        "id": 1,
        "name": "Fancy",
        "color_1": "#ea96a9",
        "color_2": "#5eaa16",
        "color_3": "#7fdee0",
        "color_4": "#f98057",
        "color_5": "#87f977",
        "project_id": 13,
        "created_at": "2019-07-10T21:42:55.178Z",
        "updated_at": "2019-07-10T21:42:55.178Z"
    }
  ]
```

## GET `/palettes/:id`
Retrieve data for a specific Palette by id. 

#### Example Request:
`/palettes/1`

#### Example Responses:

##### Status: 200 OK
```
  [
    {
        "palette_id": 1,
        "palette_name": "Dirt don't Hurt",
        "project_id": 1,
        "color_1": "#F1C231",
        "color_2": "#E69138",
        "color_3": "#44818E",
        "color_4": "#B46005",
        "color_5": "#F9CB9C",
        "created_at": "2019-05-09T19:19:55.831Z",
        "updated_at": "2019-05-09T19:19:55.831Z"
    }
  ]
```

## POST `/palettes`
Add a new palette. 

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- | --- |
| palette_name | string | Name of Palette |
| color_1 | string | HEX code for specific color |
| color_2 | string | HEX code for specific color |
| color_3 | string | HEX code for specific color |
| color_4 | string | HEX code for specific color |
| color_5 | string | HEX code for specific color |
| project_id | integer | ID of Project |

#### Request Format 
```
  {
    "palette_name": "Sorbet", 
    "project_id": 3, 
    "color_1": "#FFAB40",
    "color_2": "#4ECFE1",
    "color_3": "#EEFF41", 
    "color_4": "#F1C231",
    "color_5": "#CE5178"
  }
```

#### Example Responses:

##### Status: 200 OK
```
  { "id": 41 }
```

##### Status: 422 Unprocessable Entity
```
{
    "error": 
      "Expected format {
        name: <String>,
        color_1: <Valid Hex #>,
        color_2: <Valid Hex #>,
        color_3: <Valid Hex #>,
        color_4: <Valid Hex #>,
        color_5: <Valid Hex #>,
        project_id: <Integer>
      }, Missing project_id"
}
```

## PATCH `/palettes/:id`
Update an existing Palette by id. 

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- |
| palette_name | string | Name of Palette | 
| color_1 | string | HEX code for specific color | 
| color_2 | string | HEX code for specific color | 
| color_3 | string | HEX code for specific color | 
| color_4 | string | HEX code for specific color |
| color_5 | string | HEX code for specific color |


#### Example Request Body
```
  {
    "palette_name": "Blue Steel", 
    "color_1": "#FFAB40",
    "color_2": "#4ECFE1",
    "color_3": "#EEFF41", 
    "color_4": "#F1C231",
    "color_5": "#CE5178"
  }
```

#### Example Responses:

##### Status: 200 OK
```
  { "message": "Palette successfully updated." }
```

##### Status: 404 Not Found
```
  { "error": "Could not find a palette with id 1234." }
```
##### Status: 422 Unprocessable Entity
```
  {
    error: `Expected format {
    name: <String>,
    color_1: <Valid Hex #>,
    color_2: <Valid Hex #>,
    color_3: <Valid Hex #>,
    color_4: <Valid Hex #>,
    color_5: <Valid Hex #>,
   }, Missing ${param}`
  }
```

## DELETE `/palettes/:id`
Delete an existing Palette by id. 

#### Example Responses:

##### Status: 200 OK
```
  "Successfully deleted palette 10"
```

##### Status: 404 Not Found
```
 { "error": "Aw snap. Palette 10 doesn't seem to exist" }
```
