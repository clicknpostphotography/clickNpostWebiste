import React, { useMemo, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import "./DigitalAlbum.css";

const albumImageModules = import.meta.glob(
  "/src/assets/albums/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getFileName = (filePath) => {
  return filePath.split("/").pop() || "";
};

const getSequenceNumber = (fileName) => {
  const match = fileName.match(/-(\d+)\.[^.]+$/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const getCoupleName = (fileName) => {
  return fileName
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/-\d+$/, "") // remove sequence number
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const albums = Object.entries(albumImageModules)
  .map(([path, src]) => {
    const fileName = getFileName(path);

    return {
      id: path,
      src,
      fileName,
      name: getCoupleName(fileName),
      sequence: getSequenceNumber(fileName),
    };
  })
  .sort((firstAlbum, secondAlbum) => {
    return firstAlbum.sequence - secondAlbum.sequence;
  });

const DigitalAlbum = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [search, setSearch] = useState("");

  const filteredAlbums = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return albums;
    }

    return albums.filter((album) =>
      album.name.toLowerCase().includes(searchValue)
    );
  }, [search]);

  return (
    <main className="digitalAlbumPage">
      <section className="digitalAlbumHero">
        <p className="digitalAlbumTag">Click N Post Film Studio</p>

        <h1>
          Digital <span>Albums</span>
        </h1>

        <p className="digitalAlbumDescription">
          Find your name and scan the QR code to open your digital album.
          You can also click the QR code to view it in full size.
        </p>

        <div className="albumSearchContainer">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your name..."
            aria-label="Search digital album by name"
            className="albumSearchInput"
          />
        </div>
      </section>

      <section className="digitalAlbumSection">
        {filteredAlbums.length > 0 ? (
          <div className="digitalAlbumGrid">
            {filteredAlbums.map((album) => (
              <article className="digitalAlbumCard" key={album.id}>
                <button
                  type="button"
                  className="qrImageButton"
                  onClick={() => setSelectedAlbum(album)}
                  aria-label={`Enlarge QR code for ${album.name}`}
                >
                  <img
                    src={album.src}
                    alt={`Digital album QR code for ${album.name}`}
                    className="digitalAlbumQr"
                    loading="lazy"
                  />

                  <span className="qrHoverOverlay">
                    <Maximize2 size={26} />
                    View QR
                  </span>
                </button>

                <div className="digitalAlbumCardContent">
                  <span className="albumSequence">
                    Album {album.sequence}
                  </span>

                  <h2>{album.name}</h2>

                  <button
                    type="button"
                    className="viewQrButton"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    View QR Code
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="noAlbumFound">
            <h2>No album found</h2>
            <p>Please check the entered name and try again.</p>
          </div>
        )}
      </section>

      {selectedAlbum && (
        <div
          className="qrModalBackdrop"
          role="presentation"
          onClick={() => setSelectedAlbum(null)}
        >
          <div
            className="qrModal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedAlbum.name} digital album QR code`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="closeQrModal"
              onClick={() => setSelectedAlbum(null)}
              aria-label="Close QR code"
            >
              <X size={26} />
            </button>

            <img
              src={selectedAlbum.src}
              alt={`QR code for ${selectedAlbum.name}`}
              className="modalQrImage"
            />

            <h2>{selectedAlbum.name}</h2>
            <p>Scan this QR code to open the digital album.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default DigitalAlbum;