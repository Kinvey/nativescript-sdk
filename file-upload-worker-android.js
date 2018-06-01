"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("globals"); // necessary to bootstrap tns modules on the new thread
var file_system_1 = require("tns-core-modules/file-system");
global.onmessage = function (msg) {
    var response = upload(msg.data);
    global.postMessage({
        statusCode: response.code(),
        headers: mapHeaders(response.headers()),
        data: response.body().string()
    });
};
function upload(workerOptions) {
    var url = workerOptions.url, filePath = workerOptions.filePath, metadata = workerOptions.metadata, options = workerOptions.options;
    var byteArray = file_system_1.File.fromPath(filePath).readSync();
    var client = buildClient(options);
    var request = buildRequest(url, byteArray, metadata, options);
    return client.newCall(request).execute();
}
function buildClient(options) {
    var client = new okhttp3.OkHttpClient.Builder();
    if (options.timeout > 0) {
        client = client.connectTimeout(options.timeout, java.util.concurrent.TimeUnit.MILLISECONDS)
            .writeTimeout(options.timeout, java.util.concurrent.TimeUnit.MILLISECONDS);
    }
    return client.build();
}
function buildRequest(url, byteArray, metadata, options) {
    var mediaType = okhttp3.MediaType.parse(metadata.mimeType);
    var byteCount = metadata.size - options.start;
    var reqBody = okhttp3.RequestBody.create(mediaType, byteArray, options.start, byteCount);
    var requestBuilder = new okhttp3.Request.Builder()
        .url(url)
        .put(reqBody);
    for (var headerName in options.headers) {
        requestBuilder = requestBuilder.header(headerName, options.headers[headerName]);
    }
    return requestBuilder.build();
}
function mapHeaders(javaHeaders) {
    var headers = {};
    for (var i = 0; i < javaHeaders.size(); i += 1) {
        headers[javaHeaders.name(i).toLowerCase()] = javaHeaders.value(i);
    }
    return headers;
}
