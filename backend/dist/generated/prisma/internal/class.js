"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.5.0",
    "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  //added because of nest-prisma documentation (v7 prisma version)\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n//profile picture is missing\nmodel User {\n  id            Int            @id @default(autoincrement())\n  username      String         @unique\n  email         String         @unique\n  password      String\n  biography     String?\n  preferences   Preference[]   @ignore\n  userLocations UserLocation[] @ignore\n}\n\nmodel Sport {\n  id          Int          @id @default(autoincrement())\n  name        String       @unique\n  preferences Preference[] @ignore\n}\n\nmodel Preference {\n  id      Int    @id @default(autoincrement())\n  sport   Sport  @relation(fields: [sportId], references: [id])\n  sportId Int\n  user    User   @relation(fields: [userId], references: [id])\n  userId  Int\n  level   String\n}\n\nmodel UserLocation {\n  id         Int      @id @default(autoincrement())\n  user       User     @relation(fields: [userId], references: [id])\n  userId     Int\n  location   Location @relation(fields: [locationId], references: [id])\n  locationId Int\n}\n\nmodel Location {\n  id            Int            @id @default(autoincrement())\n  location      String\n  latitude      Float\n  longitude     Float\n  userLocations UserLocation[] @ignore\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"biography\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Sport\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Preference\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sport\",\"kind\":\"object\",\"type\":\"Sport\",\"relationName\":\"PreferenceToSport\"},{\"name\":\"sportId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PreferenceToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"level\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"UserLocation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserLocation\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"location\",\"kind\":\"object\",\"type\":\"Location\",\"relationName\":\"LocationToUserLocation\"},{\"name\":\"locationId\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Location\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Float\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Sport.findUnique\",\"Sport.findUniqueOrThrow\",\"Sport.findFirst\",\"Sport.findFirstOrThrow\",\"Sport.findMany\",\"Sport.createOne\",\"Sport.createMany\",\"Sport.createManyAndReturn\",\"Sport.updateOne\",\"Sport.updateMany\",\"Sport.updateManyAndReturn\",\"Sport.upsertOne\",\"Sport.deleteOne\",\"Sport.deleteMany\",\"Sport.groupBy\",\"Sport.aggregate\",\"Preference.findUnique\",\"Preference.findUniqueOrThrow\",\"Preference.findFirst\",\"Preference.findFirstOrThrow\",\"Preference.findMany\",\"Preference.createOne\",\"Preference.createMany\",\"Preference.createManyAndReturn\",\"Preference.updateOne\",\"Preference.updateMany\",\"Preference.updateManyAndReturn\",\"Preference.upsertOne\",\"Preference.deleteOne\",\"Preference.deleteMany\",\"Preference.groupBy\",\"Preference.aggregate\",\"UserLocation.findUnique\",\"UserLocation.findUniqueOrThrow\",\"UserLocation.findFirst\",\"UserLocation.findFirstOrThrow\",\"UserLocation.findMany\",\"UserLocation.createOne\",\"UserLocation.createMany\",\"UserLocation.createManyAndReturn\",\"UserLocation.updateOne\",\"UserLocation.updateMany\",\"UserLocation.updateManyAndReturn\",\"UserLocation.upsertOne\",\"UserLocation.deleteOne\",\"UserLocation.deleteMany\",\"UserLocation.groupBy\",\"UserLocation.aggregate\",\"Location.findUnique\",\"Location.findUniqueOrThrow\",\"Location.findFirst\",\"Location.findFirstOrThrow\",\"Location.findMany\",\"Location.createOne\",\"Location.createMany\",\"Location.createManyAndReturn\",\"Location.updateOne\",\"Location.updateMany\",\"Location.updateManyAndReturn\",\"Location.upsertOne\",\"Location.deleteOne\",\"Location.deleteMany\",\"Location.groupBy\",\"Location.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"location\",\"latitude\",\"longitude\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"userId\",\"locationId\",\"sportId\",\"level\",\"name\",\"username\",\"email\",\"password\",\"biography\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "tgEzUAhcAACXAQAwXQAABAAQXgAAlwEAMF8CAAAAAXMBAAAAAXQBAAAAAXUBAIoBACF2AQCYAQAhAQAAAAEAIAEAAAABACAIXAAAlwEAMF0AAAQAEF4AAJcBADBfAgCJAQAhcwEAigEAIXQBAIoBACF1AQCKAQAhdgEAmAEAIQF2AACwAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACADAAAABAAgAwAABQAwBAAAAQAgBV8CAAAAAXMBAAAAAXQBAAAAAXUBAAAAAXYBAAAAAQEIAAAJACAFXwIAAAABcwEAAAABdAEAAAABdQEAAAABdgEAAAABAQgAAAsAMAEIAAALADAFXwIAoAEAIXMBAJ4BACF0AQCeAQAhdQEAngEAIXYBALYBACECAAAAAQAgCAAADgAgBV8CAKABACFzAQCeAQAhdAEAngEAIXUBAJ4BACF2AQC2AQAhAgAAAAQAIAgAABAAIAIAAAAEACAIAAAQACADAAAAAQAgDwAACQAgEAAADgAgAQAAAAEAIAEAAAAEACAGFQAAsQEAIBYAALIBACAXAAC1AQAgGAAAtAEAIBkAALMBACB2AACwAQAgCFwAAJIBADBdAAAXABBeAACSAQAwXwIAfwAhcwEAgAEAIXQBAIABACF1AQCAAQAhdgEAkwEAIQMAAAAEACADAAAWADAUAAAXACADAAAABAAgAwAABQAwBAAAAQAgBVwAAJEBADBdAAAdABBeAACRAQAwXwIAAAABcgEAAAABAQAAABoAIAEAAAAaACAFXAAAkQEAMF0AAB0AEF4AAJEBADBfAgCJAQAhcgEAigEAIQADAAAAHQAgAwAAHgAwBAAAGgAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACACXwIAAAABcgEAAAABAQgAACIAIAJfAgAAAAFyAQAAAAEBCAAAJAAwAQgAACQAMAJfAgCgAQAhcgEAngEAIQIAAAAaACAIAAAnACACXwIAoAEAIXIBAJ4BACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAUVAACrAQAgFgAArAEAIBcAAK8BACAYAACuAQAgGQAArQEAIAVcAACQAQAwXQAAMAAQXgAAkAEAMF8CAH8AIXIBAIABACEDAAAAHQAgAwAALwAwFAAAMAAgAwAAAB0AIAMAAB4AMAQAABoAIAdcAACPAQAwXQAANgAQXgAAjwEAMF8CAAAAAW4CAIkBACFwAgCJAQAhcQEAigEAIQEAAAAzACABAAAAMwAgB1wAAI8BADBdAAA2ABBeAACPAQAwXwIAiQEAIW4CAIkBACFwAgCJAQAhcQEAigEAIQADAAAANgAgAwAANwAwBAAAMwAgAwAAADYAIAMAADcAMAQAADMAIAMAAAA2ACADAAA3ADAEAAAzACAEXwIAAAABbgIAAAABcAIAAAABcQEAAAABAQgAADsAIARfAgAAAAFuAgAAAAFwAgAAAAFxAQAAAAEBCAAAPQAwAQgAAD0AMARfAgCgAQAhbgIAoAEAIXACAKABACFxAQCeAQAhAgAAADMAIAgAAEAAIARfAgCgAQAhbgIAoAEAIXACAKABACFxAQCeAQAhAgAAADYAIAgAAEIAIAIAAAA2ACAIAABCACADAAAAMwAgDwAAOwAgEAAAQAAgAQAAADMAIAEAAAA2ACAFFQAApgEAIBYAAKcBACAXAACqAQAgGAAAqQEAIBkAAKgBACAHXAAAjgEAMF0AAEkAEF4AAI4BADBfAgB_ACFuAgB_ACFwAgB_ACFxAQCAAQAhAwAAADYAIAMAAEgAMBQAAEkAIAMAAAA2ACADAAA3ADAEAAAzACAGXAAAjQEAMF0AAE8AEF4AAI0BADBfAgAAAAFuAgCJAQAhbwIAiQEAIQEAAABMACABAAAATAAgBlwAAI0BADBdAABPABBeAACNAQAwXwIAiQEAIW4CAIkBACFvAgCJAQAhAAMAAABPACADAABQADAEAABMACADAAAATwAgAwAAUAAwBAAATAAgAwAAAE8AIAMAAFAAMAQAAEwAIANfAgAAAAFuAgAAAAFvAgAAAAEBCAAAVAAgA18CAAAAAW4CAAAAAW8CAAAAAQEIAABWADABCAAAVgAwA18CAKABACFuAgCgAQAhbwIAoAEAIQIAAABMACAIAABZACADXwIAoAEAIW4CAKABACFvAgCgAQAhAgAAAE8AIAgAAFsAIAIAAABPACAIAABbACADAAAATAAgDwAAVAAgEAAAWQAgAQAAAEwAIAEAAABPACAFFQAAoQEAIBYAAKIBACAXAAClAQAgGAAApAEAIBkAAKMBACAGXAAAjAEAMF0AAGIAEF4AAIwBADBfAgB_ACFuAgB_ACFvAgB_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_ACFyAQCAAQAhBVwAAJEBADBdAAAdABBeAACRAQAwXwIAiQEAIXIBAIoBACEIXAAAkgEAMF0AABcAEF4AAJIBADBfAgB_ACFzAQCAAQAhdAEAgAEAIXUBAIABACF2AQCTAQAhDhUAAJUBACAYAACWAQAgGQAAlgEAIGMBAAAAAWQBAAAABWUBAAAABWYBAAAAAWcBAAAAAWgBAAAAAWkBAAAAAWoBAJQBACFrAQAAAAFsAQAAAAFtAQAAAAEOFQAAlQEAIBgAAJYBACAZAACWAQAgYwEAAAABZAEAAAAFZQEAAAAFZgEAAAABZwEAAAABaAEAAAABaQEAAAABagEAlAEAIWsBAAAAAWwBAAAAAW0BAAAAAQhjAgAAAAFkAgAAAAVlAgAAAAVmAgAAAAFnAgAAAAFoAgAAAAFpAgAAAAFqAgCVAQAhC2MBAAAAAWQBAAAABWUBAAAABWYBAAAAAWcBAAAAAWgBAAAAAWkBAAAAAWoBAJYBACFrAQAAAAFsAQAAAAFtAQAAAAEIXAAAlwEAMF0AAAQAEF4AAJcBADBfAgCJAQAhcwEAigEAIXQBAIoBACF1AQCKAQAhdgEAmAEAIQtjAQAAAAFkAQAAAAVlAQAAAAVmAQAAAAFnAQAAAAFoAQAAAAFpAQAAAAFqAQCWAQAhawEAAAABbAEAAAABbQEAAAABAAAAAAABdwEAAAABBXcIAAAAAXgIAAAAAXkIAAAAAXoIAAAAAXsIAAAAAQV3AgAAAAF4AgAAAAF5AgAAAAF6AgAAAAF7AgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAABdwEAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAFFQAQFgARFwASGAATGQAUAAAAAAAFFQAQFgARFwASGAATGQAUAAAABRUAGhYAGxcAHBgAHRkAHgAAAAAABRUAGhYAGxcAHBgAHRkAHgAAAAUVACQWACUXACYYACcZACgAAAAAAAUVACQWACUXACYYACcZACgAAAAFFQAuFgAvFwAwGAAxGQAyAAAAAAAFFQAuFgAvFwAwGAAxGQAyAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkLHBsMHRwMHh8MHyAMICEMISMMIiUCIyYNJCgMJSoCJisOJywMKC0MKS4CKjEPKzIVLDQWLTUWLjgWLzkWMDoWMTwWMj4CMz8XNEEWNUMCNkQYN0UWOEYWOUcCOkoZO0sfPE0gPU4gPlEgP1IgQFMgQVUgQlcCQ1ghRFogRVwCRl0iR14gSF8gSWACSmMjS2QpTGYqTWcqTmoqT2sqUGwqUW4qUnACU3ErVHMqVXUCVnYsV3cqWHgqWXkCWnwtW30z"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map