# Sea-Service-Time

DAPP on Hyper Ledger Fabric for recording seafarers sea service time on a disterbuted ledger.

This repo conisist of 4 parts

- [backend](https://github.com/majid-T/sea-service-time/tree/master/backend): Which is the part which exposes chaincode function as REST endpoints. It uses JWT for authentication.
- [blockchain-network](https://github.com/majid-T/sea-service-time/tree/master/blockchain-network): Inlucdes instruction on seting up the network and registering admin and users.
- [chaincode](https://github.com/majid-T/sea-service-time/tree/master/chaincode/javascript): it inlclude's chaincode package which will be installed on each peer.
- frontend: the ReacJs frontend part to connect to the fabric nodes.

## Modeling Ver:0.3.0

### Assets

#### Sea Service Record data structure as JSON

```json
{
  "name": "Abcd Efgh",
  "dateOfBirth": "YYYY/MM/DD",
  "cdn": "CDN",
  "id": "abcdEfghCDN",
  "seaTime": "DD",
  "status": "GRAD || ACTIVE || RETIRED",
  "rank": "Master Mariner || Chief Mate || Watchkeeping Mate || Cadet",
  "dateReg": "YYYY/MM/DD",
  "serviceTimes": []
}
```

## Lifecycle and state Diagram

 <div align="center" >
      <img
        src="./media/stateDg.png"
        alt="stateDg"
        width="65%"
        height="65%"
      />
  </div>

### Transactions

Checked functions will change the state of blockchain and will cause a transaction on blockchain

- [x] create record
- [x] add sea time
- [x] promote candidate
- [ ] query sea time
- [x] retire candidate

### Contract

=== SeaServiceTime ===

| Function         | Input                                                           | output                  | Description              |
| ---------------- | --------------------------------------------------------------- | ----------------------- | ------------------------ |
| createRecord     | \_name, \_dateOfBirth, \_cdn                                    | obj (serviceTimeRecord) | Create record            |
| addServiceTime   | \_id,\_vesselOwner,\_vesselNo,\_dateSignIn,\_dateSignOff,\_time | obj (serviceTimeRecord) | add service time         |
| promoteCandidate | \_id, \_newRank                                                 | obj (serviceTimeRecord  | promoting candidate      |
| queryServiceTime | \_id,                                                           | obj (serviceTimeRecord  | read service record      |
| retireCandidate  | \_id,                                                           | obj (serviceTimeRecord  | change status to retired |

## Class Diagram

 <div align="center" >
      <img
        src="./media/classDg.png"
        alt="classDg"
        width="65%"
        height="65%"
      />
  </div>
  
=== exposed REST API endpoints details:

| HTTP Method | path                              | input                                            | output        |
| ----------- | --------------------------------- | ------------------------------------------------ | ------------- |
| + POST      | /api/contract/createRecord        | name,dateOfBirth,cdn                             | record object |
| + PUT       | api/contract/add-service-time/:id | vesselOwner-vesselNo-dateSignIn,dateSignOff,time | record object |
| + PUT       | /api/contract/promote/:id         | rank                                             | record object |
| + GET       | api/contract/query-service/:id    | N/A                                              | record object |
| + PUT       | /retire/:id                       | N/A                                              | record object |

## Sequence Diagram

 <div align="center" >
      <img
        src="./media/seqDg.png"
        alt="seqDg"
        width="65%"
        height="65%"
      />
  </div>
