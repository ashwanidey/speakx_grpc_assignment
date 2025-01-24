# BACKEND
## FILE STRUCTURE
```bash
backend/
├── data/
│   ├── questions.json
│   ├── speakx_questions.json
├── database/
│   ├── connection.js
├── models/
│   ├── Questions.js
├── node_modules/
├── proto/
│   ├── search.proto
├── services/
│   ├── searchService.js
├── utils/
│   ├── insertData.js
├── .env.example
├── .gitignore
├── client.js
├── index.js
├── nodeServer.js
├── package-lock.json
├── package.json
```
## HOW STUFF WORKS
- The `index.js` has the procedures or subroutines or methods that perform different actions. They could be to remove an item, add an item, edit an item, or anything the dev wants to do. The point here is that any action is carried out in the subroutines/methods. The server adds a service to itself using the service declared in the proto file. Methods/procedures will be created in the service to match the methods the service exports in the proto file.
- The `proto` buffer states the types, and shape of each request and response.
- The `client.js` uses the protocol buffer to get a service and then connect to it via the server's URL and port. From here now, the client can call the methods set in the server. The awesome thing here is that the server can be built in any language and the client can be built also in any language, only the proto is written in IDL.

## Reference
- [Medium Article](https://daily.dev/blog/build-a-grpc-service-in-nodejs)