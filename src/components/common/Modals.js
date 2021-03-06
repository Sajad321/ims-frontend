import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const apiUrl = process.env.API_URL;

export function AddStateModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    name: "",
    users: [],
  });
  useEffect(() => {
    setDataToSend({ ...props.state, users: props.selectedUsers });
  }, [props.show]);

  const handleNameChange = (e) => {
    setDataToSend({ ...dataToSend, name: e.target.value });
  };
  const handleChange = (selected) => {
    setDataToSend({ ...dataToSend, users: selected });
  };
  const saveState = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/states${dataToSend.id != "" ? `/` + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseData = await response.json();

      console.log(responseData);
      if (responseData.detail) {
        throw new Error(responseData.status);
      }
      toast.success("تم حفظ المنطقة");
      props.setSyncOp({ ...props.syncOp, showSync: true });
      props.getUsers();
      props.getStates();
      props.onHide();
    } catch (error) {
      console.log(error.message);
      toast.error("فشل الحفظ");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveState();
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      dir="rtl"
      className=""
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>اضافة</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="الاسم"
            className="form-control text mb-3"
            onChange={handleNameChange}
            value={dataToSend.name}
            required
          ></input>
          <span
            className="d-inline-block w-100"
            data-toggle="popover"
            data-trigger="focus"
            data-content="Please selecet account(s)"
          >
            <ReactSelect
              options={props.users}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
              onChange={handleChange}
              allowSelectAll={true}
              value={dataToSend.users}
              placeholder="المستخدمين"
              getOptionLabel={(option) =>
                option.__isNew__ ? option.label : option.name
              }
              getOptionValue={(option) =>
                option.__isNew__ ? option.value : option.id
              }
            />
          </span>
        </form>
      </Modal.Body>
      <Modal.Footer className="m-0">
        <div className="">
          <Button
            onClick={() => {
              props.onHide();
            }}
            className="btn btn-danger"
          >
            غلق
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              saveState();
            }}
            className="btn btn-primary"
          >
            {dataToSend.id != "" ? "تحديث" : "انشاء"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
export function AddUserModal(props) {
  const [dataToSend, setDataToSend] = useState({
    id: "",
    authority: [],
    name: "",
    username: "",
    password: "",
    super: 0,
  });

  useEffect(() => {
    setDataToSend(props.user);
  }, [props.show]);

  const handleChange = (selected, sup) => {
    console.log(sup);
    setDataToSend({ ...dataToSend, authority: selected, super: sup });
  };
  const handleNameChange = (e) => {
    setDataToSend({ ...dataToSend, name: e.target.value });
  };
  const handleUsernameChange = (e) => {
    setDataToSend({ ...dataToSend, username: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setDataToSend({ ...dataToSend, password: e.target.value });
  };
  const saveUser = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/users${dataToSend.id != "" ? `/` + dataToSend.id : ""}`,
        {
          method: dataToSend.id != "" ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.detail) {
        throw new Error(responseData.status);
      }
      toast.success("تم حفظ المستخدم");
      props.setSyncOp({ ...props.syncOp, showSync: true });
      props.getUsers();
      props.onHide();
    } catch (error) {
      console.log(error.message);
      toast.error("فشل الحفظ");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser();
  };
  const multi = true;
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      className=""
      dir="rtl"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>اضافة</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              id="name"
              type="text"
              placeholder="name"
              className="form-control "
              onChange={handleNameChange}
              value={dataToSend.name}
              required
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              id="email"
              type="text"
              placeholder="email"
              className="form-control "
              onChange={handleUsernameChange}
              value={dataToSend.username}
              required
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="form-control"
              onChange={handlePasswordChange}
              value={dataToSend.password}
              required
            ></input>
          </div>
          <div className="col-12">
            <span
              className="d-inline-block w-100"
              data-toggle="popover"
              data-trigger="focus"
              data-content="Please selecet account(s)"
            >
              <ReactSelect
                options={[{ name: "كل الصلاحيات", id: "all" }, ...props.states]}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={(selected) =>
                  selected.find((option) => option.id === "all")
                    ? handleChange(
                        [
                          { name: "كل الصلاحيات", id: "all" },
                          ...props.states,
                        ].slice(1),
                        true
                      )
                    : !multi
                    ? handleChange((selected && selected.id) || null, false)
                    : handleChange(selected, false)
                }
                allowSelectAll={true}
                value={dataToSend.authority}
                placeholder="الصلاحية"
                getOptionLabel={(option) =>
                  option.__isNew__ ? option.label : option.name
                }
                getOptionValue={(option) =>
                  option.__isNew__ ? option.value : option.id
                }
              />
            </span>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="m-0">
        <div className="">
          <Button
            onClick={() => {
              props.onHide();
            }}
            className="btn btn-danger"
          >
            غلق
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              saveUser();
            }}
            className="btn btn-primary"
          >
            {dataToSend.id != "" ? "تحديث" : "انشاء"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
