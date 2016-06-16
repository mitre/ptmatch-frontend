const matchRun = {
    "_id" : "572cd5771cd462994f3be600",
    "meta" : {
        "createdOn" : new Date("2016-05-06T17:33:43.037Z"),
        "lastUpdatedOn" : new Date("2016-05-06T17:33:43.037Z")
    },
    "note" : "Tweaked some algorithm stuff",
    "recordMatchContextId" : "572cd29c1cd462994f3be5fd",
    "responses" : [
        {
            "message" : {
                "_id" : "573224f11cd4629e64b5200a",
                "resourceType" : "Bundle",
                "meta" : {
                    "lastUpdated" : {
                        "time" : new Date("2016-05-10T18:14:09.671Z"),
                        "precision" : "timestamp"
                    }
                },
                "type" : "message",
                "entry" : [
                    {
                        "fullUrl" : "urn:uuid:d9d296d8-5afe-42e1-a0ce-3344e0e003ed",
                        "resource" : {
                            "resourceType" : "MessageHeader",
                            "_id" : "caf609cf-c3a7-4be4-a3aa-356b9bb69d4f",
                            "timestamp" : {
                                "time" : new Date("2015-12-08T16:17:50.000Z"),
                                "precision" : "timestamp"
                            },
                            "event" : {
                                "system" : "https://github.com/pophealth/fhir/message-events",
                                "code" : "record-match"
                            },
                            "response" : {
                                "identifier" : "38dc8168-9b74-48e6-9b61-eef7bb6c67ea",
                                "code" : "ok",
                                "details" : {
                                    "reference" : "OperationOutcome/03f9aa7d-b395-47b9-84e0-053678b6e4e3",
                                    "type" : "OperationOutcome",
                                    "referenceid" : "03f9aa7d-b395-47b9-84e0-053678b6e4e3",
                                    "external" : false
                                }
                            },
                            "source" : {
                                "endpoint" : "http://acme.com/record-matcher"
                            },
                            "destination" : [
                                {
                                    "endpoint" : "https://acme.com/pophealth"
                                }
                            ],
                            "data" : [
                                {
                                    "reference" : "urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d",
                                    "external" : false
                                },
                                {
                                    "reference" : "urn:uuid:15121321-4af5-424c-a0e1-ed3aab1c348e",
                                    "external" : false
                                }
                            ]
                        }
                    },
                    {
                        "fullUrl" : "urn:uuid:03f9aa7d-b395-47b9-84e0-053678b6e4e3",
                        "resource" : {
                            "resourceType" : "OperationOutcome"
                        }
                    },
                    {
                        "fullUrl" : "urn:uuid:15121321-4af5-424c-a0e1-ed3aab1c348e",
                        "request" : {
                            "method" : "GET",
                            "url" : "http://acme.com/popHealth/fhir/Patient?name=Jon"
                        }
                    },
                    {
                        "link" : [
                            {
                                "relation" : "type",
                                "url" : "http://hl7.org/fhir/Patient"
                            },
                            {
                                "relation" : "related",
                                "url" : "http://acme.com/popHealth/Patient/55"
                            }
                        ],
                        "fullUrl" : "http://acme.com/popHealth/Patient/5",
                        "search" : {
                            "score" : 0.8
                        }
                    }
                ]
            }
        }
    ],
    "request" : {
        "_id" : "572cd5771cd462994f3be5fe",
        "meta" : {
            "createdOn" : new Date("2016-05-06T17:33:43.032Z")
        },
        "message" : {
            "resourceType" : "Bundle",
            "_id" : "572cd5771cd462994f3be5ff",
            "type" : "message",
            "entry" : [
                {
                    "fullUrl" : "urn:uuid:6ab09309-acad-4ab5-8909-2a7c983d0bb9",
                    "resource" : {
                        "resourceType" : "MessageHeader",
                        "_id" : "6ab09309-acad-4ab5-8909-2a7c983d0bb9",
                        "timestamp" : {
                            "time" : new Date("2016-05-06T17:33:43.030Z"),
                            "precision" : "timestamp"
                        },
                        "event" : {
                            "system" : "http://github.com/mitre/ptmatch/fhir/message-events",
                            "code" : "record-match"
                        },
                        "source" : {
                            "endpoint" : "http://localhost:3001/"
                        },
                        "destination" : [
                            {
                                "name" : "Matchy Matcherton",
                                "endpoint" : "http://localhost:3001/"
                            }
                        ],
                        "data" : [
                            {
                                "reference" : "urn:uuid:38dc8168-9b74-48e6-9b61-eef7bb6c67ea"
                            }
                        ]
                    }
                },
                {
                    "fullUrl" : "urn:uuid:38dc8168-9b74-48e6-9b61-eef7bb6c67ea",
                    "resource" : {
                        "resourceType" : "Parameters",
                        "_id" : "38dc8168-9b74-48e6-9b61-eef7bb6c67ea",
                        "parameter" : [
                            {
                                "name" : "type",
                                "valueString" : "master"
                            },
                            {
                                "name" : "resourceType",
                                "valueString" : "Patient"
                            },
                            {
                                "name" : "searchExpression",
                                "resource" : {
                                    "resourceType" : "Parameters",
                                    "parameter" : [
                                        {
                                            "name" : "gender",
                                            "valueString" : "M"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    },
    "metrics" : {
        "f1" : 0.899999976158142,
        "recall" : 0.889999985694885,
        "precision" : 0.910000026226044,
        "MAP" : 0.790000021457672
    },
    "status" : [
        {
            "message" : "Request Sent [201 Created]",
            "createdOn" : new Date("2016-05-06T17:33:43.036Z")
        }
    ],
    "matchingMode" : "deduplication",
    "recordResourceType" : "Patient",
    "recordMatchSystemInterfaceId" : "571f7fc11cd46222f0491082",
    "masterRecordSetId" : "572a18ae1cd46222f049108e"
};

export default matchRun;
