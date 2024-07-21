import AsyncStorage from "@react-native-async-storage/async-storage";
import { authHost } from "../constants/auth.constants";

async function getUserInfo() {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');

    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }

    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}auth/me`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      await response.json();
      throw new Error(response.message);
    }

    return response.json();
  } catch (error) {
    alert("Error fetching client info");
    return undefined;
  }
}

async function getComedores() {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');

    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }

    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedores`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      await response.json();
      throw new Error(response.message);
    }

    return response.json();
  } catch (error) {
    alert("Error fetching comedores");
    return [];
  }
}

async function addComedor(comedorCode) {
  try {
      const authDataSerialize = await AsyncStorage.getItem('@authData');

      if (!authDataSerialize) {
          throw new Error("No hay datos de autenticación almacenados");
      }

      const { token } = JSON.parse(authDataSerialize);

      const response = await fetch(`${authHost}addComedor`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ comedorCode })
      });

      if (!response.ok) {
          throw new Error('Error en la solicitud');
      }

      return response.json();
  } catch (error) {
      console.error('Error al agregar comedor:', error);
      return undefined; 
  }
}

async function deleteComedor(comedorId) {
  try {
      const authDataSerialize = await AsyncStorage.getItem('@authData');

      if (!authDataSerialize) {
          throw new Error("No hay datos de autenticación almacenados");
      }

      const { token } = JSON.parse(authDataSerialize);

      const response = await fetch(`${authHost}deleteComedor`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ comedorId })
      });

      if (!response.ok) {
          throw new Error('Error en la solicitud');
      }

      return response.json();
  } catch (error) {
      console.error('Error al eliminar comedor:', error);
      return undefined; 
  }
}

async function getComedor(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getComida(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}/comida`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getBebidas(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}/bebidas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getFrituras(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}/frituras`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getDulces(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}/dulces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getOtros(id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}comedor/${id}/otros`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching comedor");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching comedor info:", error);
    return null;
  }
}

async function getCarritoID(correo) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}getCarrito/${correo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching carrito ID");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching carrito ID:", error);
    return null;
  }
}

async function confirmCarrito(idProducto, idCarrito) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}confirmarCarrito/${idProducto}/${idCarrito}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error confirming cart");
    }
    return response.json();
  } catch (error) {
    console.error("Error confirming cart:", error);
    return { exists: false };
  }
}

async function addToCarrito(idProducto, idCarrito) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}agregarCarrito/${idProducto}/${idCarrito}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error adding to cart");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { status: 'error', message: 'Ocurrió un error al agregar el producto al carrito.' };
  }
}

async function changePassword(previousPass, newPass, userType, id) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}changePassword/${previousPass}/${newPass}/${userType}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error changing password");
    }
    return response.json();
  } catch (error) {
    console.error("Error changing password:", error);
    return { exists: false };
  }
}

async function deleteAccount(password, id , userType) {
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');
    if (!authDataSerialize) {
      throw new Error("Not auth data storage");
    }
    const { token } = JSON.parse(authDataSerialize);

    const response = await fetch(`${authHost}deleteAccount/${password}/${id}/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Error eliminando cuenta");
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting account:", error);
    return { exists: false };
  }
}

export { getUserInfo, getComedores, addComedor, deleteComedor, getComedor, getComida, getBebidas, getFrituras, getDulces, getOtros, getCarritoID, confirmCarrito, addToCarrito, changePassword, deleteAccount };
