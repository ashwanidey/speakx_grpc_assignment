const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const connectDB = require('./database/connection');
const { searchQuestions } = require('./services/searchService');
const { insertData } = require('./utils/insertData');


connectDB();


const PROTO_PATH = path.join(__dirname, 'proto', 'search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const searchProto = grpc.loadPackageDefinition(packageDefinition).SearchService;

// Start gRPC server
const server = new grpc.Server();
server.addService(searchProto.service, { SearchQuestions: searchQuestions });

const PORT = 50051;
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://0.0.0.0:50051");

  }
);
