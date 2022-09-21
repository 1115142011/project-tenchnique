/** weekmap 大多运用于将数据封箱 无法s使用常规方法看到数据 */

function Sealer_factory() {
  const datamap = new Weekmap();
  return {
    sealer: (object) => {
      const box = Object.create(null);
      datamap.set(box, object);
      return box;
    },
    unsealer: (box) => {
      return datamap.get(box);
    },
  };
}
