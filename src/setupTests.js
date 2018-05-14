import snapshotDiff from "snapshot-diff";

expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

if (window !== undefined) {
  // When testing under JSDOM, many HTMLElement methods won't be
  // implemented. Stub methods will be added here as needed.
  window.HTMLElement.prototype.scrollIntoView = () => {};
}
