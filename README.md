[![Build Status](https://travis-ci.org/misskelly/dab-of-colors-API.svg?branch=master)](https://travis-ci.org/misskelly/dab-of-colors-API)


##### View the Dab of Colors app (currently under construction!) deployed with Firebase at https://dab-of-colors.web.app/ and checkout the front end repository at https://github.com/misskelly/dab-of-colors



# Dab Docs
<img width="300" align="right" alt="Dabbing Unicorn" src="https://user-images.githubusercontent.com/27245530/66942068-7631f900-f005-11e9-9b33-dbcafa23fdea.png">

### Root URL
```
https://palette-picker-mfjk.herokuapp.com/api/v1
```
All endpoints below are preceeded with this URL



### Projects Endpoints
Each unicorn is a "Project" (aren't we all?)

| Path | HTTP Method | Response |
| --- | --- | --- |
| `/projects` | `GET` | data for all Projects |
| `/projects` | `POST` | add a new Project |
| `/projects/:id` | `GET` | data for a specific Project |
| `/projects/:id` | `PATCH` | edit an existing Project |
| `/projects/:id` | `DELETE` | delete an existing Project |

### Palettes Endpoints
Each color scheme is a "Palette"

| Path | HTTP Method | Response |
| --- | --- | --- |
| `/palettes` | `GET` | data for all Palettes |
| `/palettes` | `POST` | add a new Palette |
| `/palettes/:id` | `GET` | data for a specific Palette |
| `/palettes/:id` | `PATCH` | edit an existing Palette |
| `/palettes/:id` | `DELETE` | delete an existing Palette |

---

## GET `/projects`
Returns an array of all Project objects

#### Example Responses

##### Status: 200 OK

```
[
    {
        "id": 1,
        "name": "Bob"
    },
    {
        "id": 4,
        "name": "Candy"
    },
    {
        "id": 25,
        "name": "Carol"
    }
]
```
---
## GET `/projects/:id`

Returns a single project object (that rhymes) with the specified id

#### Example Responses

##### Status: 200 OK

```
{
    "id": 27,
    "name": "Miguel"
}
```

##### Status: 404 Not Found

```
"Sorry, no project found with id 16."
```
---
## POST `/projects`
Adds a new project

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- | 
| name| string | Name of Project | 


#### Example Request Body
```
  { "name": "Roland" }
```

#### Example Responses:

##### Status: 200 OK
```
  { "id": 63 }
```

##### Status: 422 Unprocessable Entity
```
{
    "error": "Missing required parameter. Expected format: { name: <String> }."
}
```
---
## PATCH `/projects/:id`
This endpoint updates an existing Project. 

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- |
| name| string | Updated Name | 


#### Example Request Body
```
  { "name": "Buffy" }
```

#### Example Responses:

##### Status: 202 Accepted
```
  "Successfully edited that project name"
```

##### Status: 422 Unprocessable Entity

```
{ error: "Required format: { name: <String> }" }
```
##### Status: 404 Not Found

```
"Uh oh, could not find project with id: 9."
```
---

## DELETE `/projects/:id`
Delete an existing project and all associated palettes

### Request Body `application/json`
(No body required)


##### Status: 202 No Content

```
"Project successfully deleted"
```

##### Status: 404 Not Found

```
"No project found with the id of 1"
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
        "project_id": 58
    },
    {
        "id": 1,
        "name": "Fancy",
        "color_1": "#ea96a9",
        "color_2": "#5eaa16",
        "color_3": "#7fdee0",
        "color_4": "#f98057",
        "color_5": "#87f977",
        "project_id": 13
    }
  ]
```
---
## GET `/palettes/:id`
Retrieve data for a specific Palette by id. 

#### Example Request:
`/palettes/1`

#### Example Responses:

##### Status: 200 OK
```
  [
    {
        "id": 1,
        "name": "Dirt don't Hurt",
        "color_1": "#F1C231",
        "color_2": "#E69138",
        "color_3": "#44818E",
        "color_4": "#B46005",
        "color_5": "#F9CB9C",
        "project_id": 1        
    }
  ]
```

## POST `/palettes`
Add a new palette. 

### Request Body `application/json`
| Name | Type | Description |
| --- | --- | --- | 
| name | string | Name of Palette |
| color_1 | string | HEX code for specific color |
| color_2 | string | HEX code for specific color |
| color_3 | string | HEX code for specific color |
| color_4 | string | HEX code for specific color |
| color_5 | string | HEX code for specific color |
| project_id | integer | ID of Associated Project |

#### Request Format 
```
  {
    "palette_name": "Sorbet", 
    "color_1": "#FFAB40",
    "color_2": "#4ECFE1",
    "color_3": "#EEFF41", 
    "color_4": "#F1C231",
    "color_5": "#CE5178",
    "project_id": 3
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
| name | string | Name of Palette | 
| color_1 | string | HEX code for specific color | 
| color_2 | string | HEX code for specific color | 
| color_3 | string | HEX code for specific color | 
| color_4 | string | HEX code for specific color |
| color_5 | string | HEX code for specific color |


#### Example Request Body
```
  {
    "name": "Blue Steel", 
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
  { "error": "Could not find a palette with id: 12." }
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

