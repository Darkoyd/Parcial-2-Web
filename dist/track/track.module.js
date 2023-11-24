"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackModule = void 0;
const common_1 = require("@nestjs/common");
const track_service_1 = require("./track.service");
const typeorm_1 = require("@nestjs/typeorm");
const track_entity_1 = require("./track.entity/track.entity");
const album_entity_1 = require("../album/album.entity/album.entity");
let TrackModule = class TrackModule {
};
exports.TrackModule = TrackModule;
exports.TrackModule = TrackModule = __decorate([
    (0, common_1.Module)({
        providers: [track_service_1.TrackService],
        imports: [typeorm_1.TypeOrmModule.forFeature([track_entity_1.TrackEntity, album_entity_1.AlbumEntity])],
    })
], TrackModule);
//# sourceMappingURL=track.module.js.map