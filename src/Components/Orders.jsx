import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateManagement/StateProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Order from "./Order";

import "../Styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ cart, user }, dispatch] = useStateValue();

  useEffect(() => {
    //Set Snapshot
    if (user) {
      const ordersCol = collection(db, "users", user?.uid, "orders");
      const q = query(ordersCol, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });

      //Unsubscribe
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  return (
    <div className="orders">
      <h2 className="orders__title">Your Orders</h2>
      {orders.length === 0 ? (
        <>
          <div className="orders__details orders__details--empty">
            <h2 className="orders__title orders__title--empty">
              You Currently haven't order anything.
            </h2>
          </div>
        </>
      ) : (
        user && (
          <>
            <div className="orders__details">
              {orders?.map((order) => {
                return <Order order={order} key={order.id} />;
              })}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Orders;
