const Item = ({ item }) => {
  return (
    <li>
      {item.name} - {item.quantity}
    </li>
  );
};

export default Item;