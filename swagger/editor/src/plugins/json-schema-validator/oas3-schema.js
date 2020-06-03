export default {
  id: "",
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  required: ["openapi", "info", "paths"],
  properties: {
    openapi: {
      type: "string",
      pattern: "^3\\.0\\.\\d(-.+)?$"
    },
    info: {
      $ref: "#/definitions/Info"
    },
    externalDocs: {
      $ref: "#/definitions/ExternalDocumentation"
    },
    servers: {
      type: "array",
      items: {
        $ref: "#/definitions/Server"
      }
    },
    security: {
      type: "array",
      items: {
        $ref: "#/definitions/SecurityRequirement"
      }
    },
    tags: {
      type: "array",
      items: {
        $ref: "#/definitions/Tag"
      }
    },
    paths: {
      $ref: "#/definitions/Paths"
    },
    components: {
      $ref: "#/definitions/Components"
    }
  },
  patternProperties: {
    "^x-": {}
  },
  additionalProperties: false,
  definitions: {
    Reference: {
      type: "object",
      required: ["$ref"],
      properties: {
        $ref: {
          type: "string",
          format: "uri-reference"
        }
      }
    },
    Info: {
      type: "object",
      required: ["title", "version"],
      properties: {
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        termsOfService: {
          type: "string",
          format: "uri-reference"
        },
        contact: {
          $ref: "#/definitions/Contact"
        },
        license: {
          $ref: "#/definitions/License"
        },
        version: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Contact: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri-reference"
        },
        email: {
          type: "string",
          format: "email"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    License: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri-reference"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Server: {
      type: "object",
      required: ["url"],
      properties: {
        url: {
          type: "string"
        },
        description: {
          type: "string"
        },
        variables: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/ServerVariable"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ServerVariable: {
      type: "object",
      required: ["default"],
      properties: {
        enum: {
          type: "array",
          items: {
            type: "string"
          }
        },
        default: {
          type: "string"
        },
        description: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Components: {
      type: "object",
      properties: {
        schemas: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Schema"
                }
              ]
            }
          }
        },
        responses: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Response"
                }
              ]
            }
          }
        },
        parameters: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Parameter"
                }
              ]
            }
          }
        },
        examples: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Example"
                }
              ]
            }
          }
        },
        requestBodies: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/RequestBody"
                }
              ]
            }
          }
        },
        headers: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Header"
                }
              ]
            }
          }
        },
        securitySchemes: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/SecurityScheme"
                }
              ]
            }
          }
        },
        links: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Link"
                }
              ]
            }
          }
        },
        callbacks: {
          type: "object",
          patternProperties: {
            "^[a-zA-Z0-9\\.\\-_]+$": {
              oneOf: [
                {
                  $ref: "#/definitions/Reference"
                },
                {
                  $ref: "#/definitions/Callback"
                }
              ]
            }
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Schema: {
      type: "object",
      properties: {
        title: {
          type: "string"
        },
        multipleOf: {
          type: "number",
          minimum: 0,
          exclusiveMinimum: true
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "boolean",
          default: false
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "boolean",
          default: false
        },
        maxLength: {
          type: "integer",
          minimum: 0
        },
        minLength: {
          type: "integer",
          minimum: 0,
          default: 0
        },
        pattern: {
          type: "string",
          format: "regex"
        },
        maxItems: {
          type: "integer",
          minimum: 0
        },
        minItems: {
          type: "integer",
          minimum: 0,
          default: 0
        },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        maxProperties: {
          type: "integer",
          minimum: 0
        },
        minProperties: {
          type: "integer",
          minimum: 0,
          default: 0
        },
        required: {
          type: "array",
          items: {
            type: "string"
          },
          minItems: 1,
          uniqueItems: true
        },
        enum: {
          type: "array",
          items: {},
          minItems: 1,
          uniqueItems: true
        },
        type: {
          type: "string",
          enum: ["array", "boolean", "integer", "number", "object", "string"]
        },
        not: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        allOf: {
          type: "array",
          items: {
            oneOf: [
              {
                $ref: "#/definitions/Schema"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        oneOf: {
          type: "array",
          items: {
            oneOf: [
              {
                $ref: "#/definitions/Schema"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        anyOf: {
          type: "array",
          items: {
            oneOf: [
              {
                $ref: "#/definitions/Schema"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        items: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        properties: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Schema"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        additionalProperties: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            },
            {
              type: "boolean"
            }
          ],
          default: true
        },
        description: {
          type: "string"
        },
        format: {
          type: "string"
        },
        default: {},
        nullable: {
          type: "boolean",
          default: false
        },
        discriminator: {
          $ref: "#/definitions/Discriminator"
        },
        readOnly: {
          type: "boolean",
          default: false
        },
        writeOnly: {
          type: "boolean",
          default: false
        },
        example: {},
        externalDocs: {
          $ref: "#/definitions/ExternalDocumentation"
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        xml: {
          $ref: "#/definitions/XML"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Discriminator: {
      type: "object",
      required: ["propertyName"],
      properties: {
        propertyName: {
          type: "string"
        },
        mapping: {
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }
      }
    },
    XML: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        namespace: {
          type: "string",
          format: "url"
        },
        prefix: {
          type: "string"
        },
        attribute: {
          type: "boolean",
          default: false
        },
        wrapped: {
          type: "boolean",
          default: false
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Response: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          type: "string"
        },
        headers: {
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Header"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        content: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MediaType"
          }
        },
        links: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Link"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    MediaType: {
      oneOf: [
        {
          $ref: "#/definitions/MediaTypeWithExample"
        },
        {
          $ref: "#/definitions/MediaTypeWithExamples"
        }
      ]
    },
    MediaTypeWithExample: {
      type: "object",
      properties: {
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {},
        encoding: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/Encoding"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    MediaTypeWithExamples: {
      type: "object",
      required: ["examples"],
      properties: {
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        encoding: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/Encoding"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Example: {
      type: "object",
      properties: {
        summary: {
          type: "string"
        },
        description: {
          type: "string"
        },
        value: {},
        externalValue: {
          type: "string",
          format: "uri-reference"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Header: {
      oneOf: [
        {
          $ref: "#/definitions/HeaderWithSchema"
        },
        {
          $ref: "#/definitions/HeaderWithContent"
        }
      ]
    },
    HeaderWithSchema: {
      oneOf: [
        {
          $ref: "#/definitions/HeaderWithSchemaWithExample"
        },
        {
          $ref: "#/definitions/HeaderWithSchemaWithExamples"
        }
      ]
    },
    HeaderWithSchemaWithExample: {
      type: "object",
      required: ["schema"],
      properties: {
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {}
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    HeaderWithSchemaWithExamples: {
      type: "object",
      required: ["schema", "examples"],
      properties: {
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    HeaderWithContent: {
      type: "object",
      required: ["content"],
      properties: {
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        content: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MediaType"
          },
          minProperties: 1,
          maxProperties: 1
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Paths: {
      type: "object",
      patternProperties: {
        "^\\/": {
          $ref: "#/definitions/PathItem"
        },
        "^x-": {}
      },
      additionalProperties: false
    },
    PathItem: {
      type: "object",
      properties: {
        $ref: {
          type: "string"
        },
        summary: {
          type: "string"
        },
        description: {
          type: "string"
        },
        get: {
          $ref: "#/definitions/Operation"
        },
        put: {
          $ref: "#/definitions/Operation"
        },
        post: {
          $ref: "#/definitions/Operation"
        },
        delete: {
          $ref: "#/definitions/Operation"
        },
        options: {
          $ref: "#/definitions/Operation"
        },
        head: {
          $ref: "#/definitions/Operation"
        },
        patch: {
          $ref: "#/definitions/Operation"
        },
        trace: {
          $ref: "#/definitions/Operation"
        },
        servers: {
          type: "array",
          items: {
            $ref: "#/definitions/Server"
          }
        },
        parameters: {
          type: "array",
          items: {
            oneOf: [
              {
                $ref: "#/definitions/Parameter"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Operation: {
      type: "object",
      required: ["responses"],
      properties: {
        tags: {
          type: "array",
          items: {
            type: "string"
          }
        },
        summary: {
          type: "string"
        },
        description: {
          type: "string"
        },
        externalDocs: {
          $ref: "#/definitions/ExternalDocumentation"
        },
        operationId: {
          type: "string"
        },
        parameters: {
          type: "array",
          items: {
            oneOf: [
              {
                $ref: "#/definitions/Parameter"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        requestBody: {
          oneOf: [
            {
              $ref: "#/definitions/RequestBody"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        responses: {
          $ref: "#/definitions/Responses"
        },
        callbacks: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Callback"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        security: {
          type: "array",
          items: {
            $ref: "#/definitions/SecurityRequirement"
          }
        },
        servers: {
          type: "array",
          items: {
            $ref: "#/definitions/Server"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Responses: {
      type: "object",
      properties: {
        default: {
          oneOf: [
            {
              $ref: "#/definitions/Response"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        }
      },
      patternProperties: {
        "[1-5](?:\\d{2}|XX)": {
          oneOf: [
            {
              $ref: "#/definitions/Response"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        "^x-": {}
      },
      minProperties: 1,
      additionalProperties: false,
      not: {
        type: "object",
        patternProperties: {
          "^x-": {}
        },
        additionalProperties: false
      }
    },
    SecurityRequirement: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    Tag: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string"
        },
        externalDocs: {
          $ref: "#/definitions/ExternalDocumentation"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ExternalDocumentation: {
      type: "object",
      required: ["url"],
      properties: {
        description: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri-reference"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Parameter: {
      oneOf: [
        {
          $ref: "#/definitions/ParameterWithSchema"
        },
        {
          $ref: "#/definitions/ParameterWithContent"
        }
      ]
    },
    ParameterWithSchema: {
      oneOf: [
        {
          $ref: "#/definitions/ParameterWithSchemaWithExample"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExamples"
        }
      ]
    },
    ParameterWithSchemaWithExample: {
      oneOf: [
        {
          $ref: "#/definitions/ParameterWithSchemaWithExampleInPath"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExampleInQuery"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExampleInHeader"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExampleInCookie"
        }
      ]
    },
    ParameterWithSchemaWithExampleInPath: {
      type: "object",
      required: ["name", "in", "schema", "required"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["path"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          enum: [true]
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["matrix", "label", "simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {}
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExampleInQuery: {
      type: "object",
      required: ["name", "in", "schema"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["query"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["form", "spaceDelimited", "pipeDelimited", "deepObject"],
          default: "form"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {}
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExampleInHeader: {
      type: "object",
      required: ["name", "in", "schema"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["header"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {}
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExampleInCookie: {
      type: "object",
      required: ["name", "in", "schema"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["cookie"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["form"],
          default: "form"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        example: {}
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExamples: {
      oneOf: [
        {
          $ref: "#/definitions/ParameterWithSchemaWithExamplesInPath"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExamplesInQuery"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExamplesInHeader"
        },
        {
          $ref: "#/definitions/ParameterWithSchemaWithExamplesInCookie"
        }
      ]
    },
    ParameterWithSchemaWithExamplesInPath: {
      type: "object",
      required: ["name", "in", "schema", "required", "examples"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["path"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          enum: [true]
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["matrix", "label", "simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExamplesInQuery: {
      type: "object",
      required: ["name", "in", "schema", "examples"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["query"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["form", "spaceDelimited", "pipeDelimited", "deepObject"],
          default: "form"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExamplesInHeader: {
      type: "object",
      required: ["name", "in", "schema", "examples"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["header"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["simple"],
          default: "simple"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithSchemaWithExamplesInCookie: {
      type: "object",
      required: ["name", "in", "schema", "examples"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["cookie"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        style: {
          type: "string",
          enum: ["form"],
          default: "form"
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        },
        schema: {
          oneOf: [
            {
              $ref: "#/definitions/Schema"
            },
            {
              $ref: "#/definitions/Reference"
            }
          ]
        },
        examples: {
          type: "object",
          additionalProperties: {
            oneOf: [
              {
                $ref: "#/definitions/Example"
              },
              {
                $ref: "#/definitions/Reference"
              }
            ]
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithContent: {
      oneOf: [
        {
          $ref: "#/definitions/ParameterWithContentInPath"
        },
        {
          $ref: "#/definitions/ParameterWithContentNotInPath"
        }
      ]
    },
    ParameterWithContentInPath: {
      type: "object",
      required: ["name", "in", "content"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["path"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          enum: [true]
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        content: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MediaType"
          },
          minProperties: 1,
          maxProperties: 1
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ParameterWithContentNotInPath: {
      type: "object",
      required: ["name", "in", "content"],
      properties: {
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["query", "header", "cookie"]
        },
        description: {
          type: "string"
        },
        required: {
          type: "boolean",
          default: false
        },
        deprecated: {
          type: "boolean",
          default: false
        },
        allowEmptyValue: {
          type: "boolean",
          default: false
        },
        content: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MediaType"
          },
          minProperties: 1,
          maxProperties: 1
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    RequestBody: {
      type: "object",
      required: ["content"],
      properties: {
        description: {
          type: "string"
        },
        content: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MediaType"
          }
        },
        required: {
          type: "boolean",
          default: false
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    SecurityScheme: {
      oneOf: [
        {
          $ref: "#/definitions/APIKeySecurityScheme"
        },
        {
          $ref: "#/definitions/HTTPSecurityScheme"
        },
        {
          $ref: "#/definitions/OAuth2SecurityScheme"
        },
        {
          $ref: "#/definitions/OpenIdConnectSecurityScheme"
        }
      ]
    },
    APIKeySecurityScheme: {
      type: "object",
      required: ["type", "name", "in"],
      properties: {
        type: {
          type: "string",
          enum: ["apiKey"]
        },
        name: {
          type: "string"
        },
        in: {
          type: "string",
          enum: ["header", "query", "cookie"]
        },
        description: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    HTTPSecurityScheme: {
      oneOf: [
        {
          $ref: "#/definitions/NonBearerHTTPSecurityScheme"
        },
        {
          $ref: "#/definitions/BearerHTTPSecurityScheme"
        }
      ]
    },
    NonBearerHTTPSecurityScheme: {
      not: {
        type: "object",
        properties: {
          scheme: {
            type: "string",
            enum: ["bearer"]
          }
        }
      },
      type: "object",
      required: ["scheme", "type"],
      properties: {
        scheme: {
          type: "string"
        },
        description: {
          type: "string"
        },
        type: {
          type: "string",
          enum: ["http"]
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    BearerHTTPSecurityScheme: {
      type: "object",
      required: ["type", "scheme"],
      properties: {
        scheme: {
          type: "string",
          enum: ["bearer"]
        },
        bearerFormat: {
          type: "string"
        },
        type: {
          type: "string",
          enum: ["http"]
        },
        description: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    OAuth2SecurityScheme: {
      type: "object",
      required: ["type", "flows"],
      properties: {
        type: {
          type: "string",
          enum: ["oauth2"]
        },
        flows: {
          $ref: "#/definitions/OAuthFlows"
        },
        description: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    OpenIdConnectSecurityScheme: {
      type: "object",
      required: ["type", "openIdConnectUrl"],
      properties: {
        type: {
          type: "string",
          enum: ["openIdConnect"]
        },
        openIdConnectUrl: {
          type: "string",
          format: "url"
        },
        description: {
          type: "string"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    OAuthFlows: {
      type: "object",
      properties: {
        implicit: {
          $ref: "#/definitions/ImplicitOAuthFlow"
        },
        password: {
          $ref: "#/definitions/PasswordOAuthFlow"
        },
        clientCredentials: {
          $ref: "#/definitions/ClientCredentialsFlow"
        },
        authorizationCode: {
          $ref: "#/definitions/AuthorizationCodeOAuthFlow"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ImplicitOAuthFlow: {
      type: "object",
      required: ["authorizationUrl", "scopes"],
      properties: {
        authorizationUrl: {
          type: "string",
          format: "uri-reference"
        },
        refreshUrl: {
          type: "string",
          format: "uri-reference"
        },
        scopes: {
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    PasswordOAuthFlow: {
      type: "object",
      required: ["tokenUrl"],
      properties: {
        tokenUrl: {
          type: "string",
          format: "uri-reference"
        },
        refreshUrl: {
          type: "string",
          format: "uri-reference"
        },
        scopes: {
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    ClientCredentialsFlow: {
      type: "object",
      required: ["tokenUrl"],
      properties: {
        tokenUrl: {
          type: "string",
          format: "uri-reference"
        },
        refreshUrl: {
          type: "string",
          format: "uri-reference"
        },
        scopes: {
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    AuthorizationCodeOAuthFlow: {
      type: "object",
      required: ["authorizationUrl", "tokenUrl"],
      properties: {
        authorizationUrl: {
          type: "string",
          format: "uri-reference"
        },
        tokenUrl: {
          type: "string",
          format: "uri-reference"
        },
        refreshUrl: {
          type: "string",
          format: "uri-reference"
        },
        scopes: {
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Link: {
      oneOf: [
        {
          $ref: "#/definitions/LinkWithOperationRef"
        },
        {
          $ref: "#/definitions/LinkWithOperationId"
        }
      ]
    },
    LinkWithOperationRef: {
      type: "object",
      properties: {
        operationRef: {
          type: "string",
          format: "uri-reference"
        },
        parameters: {
          type: "object",
          additionalProperties: {}
        },
        requestBody: {},
        description: {
          type: "string"
        },
        server: {
          $ref: "#/definitions/Server"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    LinkWithOperationId: {
      type: "object",
      properties: {
        operationId: {
          type: "string"
        },
        parameters: {
          type: "object",
          additionalProperties: {}
        },
        requestBody: {},
        description: {
          type: "string"
        },
        server: {
          $ref: "#/definitions/Server"
        }
      },
      patternProperties: {
        "^x-": {}
      },
      additionalProperties: false
    },
    Callback: {
      type: "object",
      additionalProperties: {
        $ref: "#/definitions/PathItem"
      },
      patternProperties: {
        "^x-": {}
      }
    },
    Encoding: {
      type: "object",
      properties: {
        contentType: {
          type: "string"
        },
        headers: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/Header"
          }
        },
        style: {
          type: "string",
          enum: ["form", "spaceDelimited", "pipeDelimited", "deepObject"]
        },
        explode: {
          type: "boolean"
        },
        allowReserved: {
          type: "boolean",
          default: false
        }
      },
      additionalProperties: false
    }
  }
}
