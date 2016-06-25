'use strict';

const Promise = require('bluebird');

const Types = require('../types/documentTypes');
const ARTIST = Types.ARTIST;
const ALBUM = Types.ALBUM;
const TRACK = Types.TRACK;

class AlbumsService {
  constructor(db, AlbumsService){
    this.db = db;
    this.albumsService = AlbumsService;
  }

  /**
   * Find all the albums that belong to a band
   * @deprecated
   * @param _id The band id
   * @returns {Promise} Returns a Promise than when solved returns all the albums
   */
  findByBand(_id){

  }

  find(_id){
    return new Promise((resolve, reject) => {
      this.db.findOne( {$and: [{_id: _id}, {docType: ALBUM}]}, (err, album) => {
        if (err) return reject(err);

            let complexQuery = {
            $and: [
              {
                docType: TRACK
              }, {
                _id: { $in: album.tracks }
              }]};

          this.db.find(complexQuery, (err, tracks) => {
            if (err) return reject(err);

            album.tracks = tracks;

              resolve(album);
          });
      });
    });
  }
}

module.exports = AlbumsService;