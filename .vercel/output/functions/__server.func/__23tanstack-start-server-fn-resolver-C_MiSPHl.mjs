//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-C_MiSPHl.js
var manifest = { "1bea4e9f680e3df847651731d2ef1c6f6fa0da1b0eb097df44390fcf02819c1a": {
	functionName: "generateTopic_createServerFn_handler",
	importer: () => import("./_ssr/generate-topic-D7ORCwve.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
