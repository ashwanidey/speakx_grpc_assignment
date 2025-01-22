const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const path = require('path');


const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const PROTO_PATH = path.join(__dirname, 'proto', 'search.proto');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const SearchService = grpc.loadPackageDefinition(packageDefinition).SearchService;

const client = new SearchService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
