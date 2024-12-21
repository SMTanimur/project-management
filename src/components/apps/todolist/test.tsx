/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  Menu,
  MenuButton,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { todos } from "@/data/todo";
import { cn } from "@/lib/utils";
import { ITodo } from "@/types";
import { DotSquareIcon, EllipsisVertical, RotateCcw } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import TodoSidebar from "./todo-sidebar";
import { Input } from "@/components/ui/input";

const ComponentsAppsTodoList = () => {
  const defaultParams = {
    id: null,
    title: "",
    description: "",
    descriptionText: "",
    assignee: "",
    path: "",
    tag: "",
    priority: "low",
  };

  const [selectedTab, setSelectedTab] = useState("");
  const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );

  const [allTasks, setAllTasks] = useState<ITodo[] | []>(todos);

  const [filteredTasks, setFilteredTasks] = useState<any>(allTasks);
  const [pagedTasks, setPagedTasks] = useState<any>(filteredTasks);
  const [searchTask, setSearchTask] = useState<any>("");
  const [selectedTask, setSelectedTask] = useState<any>(defaultParams);
  const [isPriorityMenu] = useState<any>(null);
  const [isTagMenu] = useState<any>(null);

  const [pager] = useState<any>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    startIndex: 0,
    endIndex: 0,
  });

  useEffect(() => {
    searchTasks();
  }, [selectedTab, searchTask, allTasks]);

  const changeValue = (e: any) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const searchTasks = (isResetPage = true) => {
    if (isResetPage) {
      pager.currentPage = 1;
    }
    let res;
    if (
      selectedTab === "complete" ||
      selectedTab === "important" ||
      selectedTab === "trash"
    ) {
      res = allTasks.filter((d) => d.status === selectedTab);
    } else {
      res = allTasks.filter((d) => d.status !== "trash");
    }

    if (selectedTab === "team" || selectedTab === "update") {
      res = res.filter((d) => d.tag === selectedTab);
    } else if (
      selectedTab === "high" ||
      selectedTab === "medium" ||
      selectedTab === "low"
    ) {
      res = res.filter((d) => d.priority === selectedTab);
    }
    setFilteredTasks([
      ...res.filter((d: any) => d.title?.toLowerCase().includes(searchTask)),
    ]);
    getPager(
      res.filter((d: any) => d.title?.toLowerCase().includes(searchTask))
    );
  };

  const getPager = (res: any) => {
    setTimeout(() => {
      if (res.length) {
        pager.totalPages =
          pager.pageSize < 1 ? 1 : Math.ceil(res.length / pager.pageSize);
        if (pager.currentPage > pager.totalPages) {
          pager.currentPage = 1;
        }
        pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
        pager.endIndex = Math.min(
          pager.startIndex + pager.pageSize - 1,
          res.length - 1
        );
        setPagedTasks(res.slice(pager.startIndex, pager.endIndex + 1));
      } else {
        setPagedTasks([]);
        pager.startIndex = -1;
        pager.endIndex = -1;
      }
    });
  };

  const setPriority = (task: any, name: string = "") => {
    let item = filteredTasks.find((d: any) => d.id === task.id);
    item.priority = name;
    searchTasks(false);
  };

  const setTag = (task: any, name: string = "") => {
    let item = filteredTasks.find((d: any) => d.id === task.id);
    item.tag = name;
    searchTasks(false);
  };

  const tabChanged = () => {
    setIsShowTaskMenu(false);
  };

  const taskComplete = (task: any = null) => {
    let item = filteredTasks.find((d: any) => d.id === task.id);
    item.status = item.status === "complete" ? "" : "complete";
    searchTasks(false);
  };

  const setImportant = (task: any = null) => {
    let item = filteredTasks.find((d: any) => d.id === task.id);
    item.status = item.status === "important" ? "" : "important";
    searchTasks(false);
  };

  const viewTask = (item: any = null) => {
    setSelectedTask(item);
    setTimeout(() => {
      setViewTaskModal(true);
    });
  };

  const addEditTask = (task: any = null) => {
    setIsShowTaskMenu(false);
    let json = JSON.parse(JSON.stringify(defaultParams));
    setParams(json);
    if (task) {
      let json1 = JSON.parse(JSON.stringify(task));
      setParams(json1);
    }
    setAddTaskModal(true);
  };

  const deleteTask = (task: any, type: string = "") => {
    if (type === "delete") {
      task.status = "trash";
    }
    if (type === "deletePermanent") {
      setAllTasks(allTasks.filter((d: any) => d.id !== task.id));
    } else if (type === "restore") {
      task.status = "";
    }
    searchTasks(false);
  };

  const saveTask = () => {
    if (!params.title) {
      showMessage("Title is required.", "error");
      return false;
    }
    if (params.id) {
      //update task
      setAllTasks(
        allTasks.map((d: any) => {
          if (d.id === params.id) {
            d = params;
          }
          return d;
        })
      );
    } else {
      //add task
      const maxId = allTasks?.length
        ? allTasks.reduce(
            (max, obj) => (obj.id > max ? obj.id : max),
            allTasks[0].id
          )
        : 0;
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth());
      const yyyy = today.getFullYear();
      const monthNames: any = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let task = params;
      task.id = maxId + 1;
      task.date = monthNames[mm] + ", " + dd + " " + yyyy;
      allTasks.unshift(task as never);
      searchTasks();
    }
    showMessage("Task has been saved successfully.");
    setAddTaskModal(false);
  };

  const showMessage = (msg = "", type = "success") => {
    const toast: any = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  return (
    <div>
      <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
        {/* sidebar */}
        <TodoSidebar
          addEditTask={addEditTask}
          allTasks={allTasks}
          isShowTaskMenu={isShowTaskMenu}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabChanged={tabChanged}
        />
        <div
          className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${
            isShowTaskMenu && "!block xl:!hidden"
          }`}
          onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
        ></div>
        <div className="panel h-full flex-1 overflow-auto p-0">
          <div className="flex h-full flex-col">
            <div className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center mr-3">
                <button
                  type="button"
                  className="block hover:text-primary mr-3  xl:hidden"
                  onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
                >
                  <Icons.menu />
                </button>
                <div className="group relative flex-1">
                  <Input
                    type="text"
                    className="peer form-input !pr-10 "
                    placeholder="Search Task..."
                    value={searchTask}
                    onChange={(e) => setSearchTask(e.target.value)}
                    onKeyUp={() => searchTasks()}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary right-[11px] ">
                    <Icons.search />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center sm:flex-auto sm:justify-end">
                <p className="mr-3 ">
                  {pager.startIndex +
                    1 +
                    "-" +
                    (pager.endIndex + 1) +
                    " of " +
                    filteredTasks.length}
                </p>
                <button
                  type="button"
                  disabled={pager.currentPage === 1}
                  className="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 mr-3  dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30"
                  onClick={() => {
                    pager.currentPage--;
                    searchTasks(false);
                  }}
                >
                  <Icons.chevronDown className="h-5 w-5 rotate-90 " />
                </button>
                <button
                  type="button"
                  disabled={pager.currentPage === pager.totalPages}
                  className="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30"
                  onClick={() => {
                    pager.currentPage++;
                    searchTasks(false);
                  }}
                >
                  <Icons.chevronDown className="h-5 w-5 -rotate-90 " />
                </button>
              </div>
            </div>
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

            {pagedTasks.length ? (
              <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px]">
                <table className="table-hover">
                  <tbody>
                    {pagedTasks.map((task: any) => {
                      return (
                        <tr
                          className={`group cursor-pointer ${
                            task.status === "complete"
                              ? "bg-white-light/30 dark:bg-[#1a2941] "
                              : ""
                          }`}
                          key={task.id}
                        >
                          <td className="w-1">
                            <input
                              type="checkbox"
                              id={`chk-${task.id}`}
                              className="form-checkbox"
                              disabled={selectedTab === "trash"}
                              onClick={() => taskComplete(task)}
                              defaultChecked={task.status === "complete"}
                            />
                          </td>
                          <td>
                            <div onClick={() => viewTask(task)}>
                              <div
                                className={`whitespace-nowrap text-base font-semibold group-hover:text-primary ${
                                  task.status === "complete"
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </div>
                              <div
                                className={`line-clamp-1 min-w-[300px] overflow-hidden text-white-dark ${
                                  task.status === "complete"
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                {task.descriptionText}
                              </div>
                            </div>
                          </td>
                          <td className="w-1">
                            <div className="flex items-center space-x-2 justify-end  ">
                              {task.priority && (
                                <div className="dropdown">
                                  <Menu>
                                    <MenuButton >
                                      <Badge
                                        className={cn(
                                          task.priority === "medium"
                                            ? "border border-primary text-primary bg-transparent hover:bg-primary hover-text-white"
                                            : task.priority === "low"
                                            ? "bg-transparent border border-warning text-warning hover:text-white hover:bg-warning"
                                            : task.priority === "high"
                                            ? "bg-transparent border border-danger text-danger hover:text-white  hover:bg-danger"
                                            : task.priority === "medium" &&
                                              isPriorityMenu === task.id
                                            ? "bg-primary  text-white"
                                            : task.priority === "low" &&
                                              isPriorityMenu === task.id
                                            ? "bg-warning text-white"
                                            : task.priority === "high" &&
                                              isPriorityMenu === task.id
                                            ? "bg-danger text-white"
                                            : ""
                                        )}
                                      >
                                        {task.priority}
                                      </Badge>
                                    </MenuButton>
                                    <Transition
                                      enter="transition ease-out duration-75"
                                      enterFrom="opacity-0 scale-95"
                                      enterTo="opacity-100 scale-100"
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100 scale-100"
                                      leaveTo="opacity-0 scale-95"
                                    >
                                      <MenuItems
                                        anchor="bottom end"
                                        className="w-[320px] origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-dark [--anchor-gap:var(--spacing-1)] focus:outline-none mt-3 z-20"
                                      >
                                        <ul className="text-medium text-sm">
                                          <li>
                                            <button
                                              type="button"
                                              className="text-danger text-left "
                                              onClick={() =>
                                                setPriority(task, "high")
                                              }
                                            >
                                              High
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="text-primary text-left "
                                              onClick={() =>
                                                setPriority(task, "medium")
                                              }
                                            >
                                              Medium
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="text-warning text-left "
                                              onClick={() =>
                                                setPriority(task, "low")
                                              }
                                            >
                                              Low
                                            </button>
                                          </li>
                                        </ul>
                                      </MenuItems>
                                    </Transition>
                                  </Menu>
                                </div>
                              )}

                              {task.tag && (
                                <div className="dropdown">
                                  <Menu>
                                    <MenuButton className="">
                                      <Badge
                                        className={cn(
                                          task.tag === "team"
                                            ? "bg-transparent border outline-success hover:bg-success"
                                            : task.tag === "update"
                                            ? "bg-transparent border outline-info hover:bg-info"
                                            : task.tag === "team" &&
                                              isTagMenu === task.id
                                            ? "bg-success border text-white "
                                            : task.tag === "update" &&
                                              isTagMenu === task.id
                                            ? "bg-info border text-white "
                                            : ""
                                        )}
                                      >
                                        {task.priority}
                                      </Badge>
                                    </MenuButton>
                                    <Transition
                                      enter="transition ease-out duration-75"
                                      enterFrom="opacity-0 scale-95"
                                      enterTo="opacity-100 scale-100"
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100 scale-100"
                                      leaveTo="opacity-0 scale-95"
                                    >
                                      <MenuItems
                                        anchor="bottom end"
                                        className="w-[320px] origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-dark [--anchor-gap:var(--spacing-1)] focus:outline-none mt-3 z-20"
                                      >
                                        <ul className="text-medium text-sm">
                                          <li>
                                            <button
                                              type="button"
                                              className="text-success"
                                              onClick={() =>
                                                setTag(task, "team")
                                              }
                                            >
                                              Team
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              className="text-info"
                                              onClick={() =>
                                                setTag(task, "update")
                                              }
                                            >
                                              Update
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              type="button"
                                              onClick={() => setTag(task, "")}
                                            >
                                              None
                                            </button>
                                          </li>
                                        </ul>
                                      </MenuItems>
                                    </Transition>
                                  </Menu>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="w-1">
                            <p
                              className={`whitespace-nowrap font-medium text-white-dark ${
                                task.status === "complete" ? "line-through" : ""
                              }`}
                            >
                              {task.date}
                            </p>
                          </td>
                          <td className="w-1">
                            <div className="flex w-max items-center justify-between">
                              <div className="flex-shrink-0 mr-2.5 .5">
                                {task.path && (
                                  <div>
                                    <img
                                      src={`/assets/images/${task.path}`}
                                      className="h-8 w-8 rounded-full object-cover"
                                      alt="avatar"
                                    />
                                  </div>
                                )}
                                {!task.path && task.assignee ? (
                                  <div className="grid h-8 w-8 place-content-center rounded-full bg-primary text-sm font-semibold text-white">
                                    {task.assignee.charAt(0) +
                                      "" +
                                      task.assignee.charAt(
                                        task.assignee.indexOf(" ") + 1
                                      )}
                                  </div>
                                ) : (
                                  ""
                                )}
                                {!task.path && !task.assignee ? (
                                  <div className="grid h-8 w-8 place-content-center rounded-full border border-gray-300 dark:border-gray-800">
                                    <Icons.user className="h-4.5 w-4.5" />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="dropdown">
                                <Menu>
                                  <MenuButton>
                                    <EllipsisVertical className="opacity-70" />
                                  </MenuButton>
                                  <Transition
                                    enter="transition ease-out duration-75"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                  >
                                    <MenuItems
                                      anchor="bottom end"
                                      className="w-[140px] origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-dark [--anchor-gap:var(--spacing-1)] focus:outline-none mt-3 z-20"
                                    >
                                      <ul className="whitespace-nowrap ">
                                        {selectedTab !== "trash" && (
                                          <>
                                            <li className="flex items-center">
                                            <Icons.pencil className="h-4 w-4 shrink-0 mr-2 " />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  addEditTask(task)
                                                }
                                              >
                                                
                                                Edit
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  deleteTask(task, "delete")
                                                }
                                              >
                                                <Icons.trash className="shrink-0 mr-2 w-4 h-4 " />
                                                Delete
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setImportant(task)
                                                }
                                              >
                                                <Icons.star className="h-4 w-4 shrink-0 mr-2 " />
                                                <span>
                                                  {task.status === "important"
                                                    ? "Not Important"
                                                    : "Important"}
                                                </span>
                                              </button>
                                            </li>
                                          </>
                                        )}
                                        {selectedTab === "trash" && (
                                          <>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  deleteTask(
                                                    task,
                                                    "deletePermanent"
                                                  )
                                                }
                                              >
                                                <Icons.trash className="shrink-0 mr-2 w-4 h-4" />
                                                Permanent Delete
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  deleteTask(task, "restore")
                                                }
                                              >
                                                <RotateCcw className="shrink-0 mr-2 " />
                                                Restore Task
                                              </button>
                                            </li>
                                          </>
                                        )}
                                      </ul>
                                    </MenuItems>
                                  </Transition>
                                </Menu>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-full min-h-[400px] items-center justify-center text-lg font-semibold sm:min-h-[300px]">
                No data available
              </div>
            )}
          </div>
        </div>

        <Transition appear show={addTaskModal} as={Fragment}>
          <Dialog
            as="div"
            open={addTaskModal}
            onClose={() => setAddTaskModal(false)}
            className="relative z-50"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[black]/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center px-4 py-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                    <button
                      type="button"
                      onClick={() => setAddTaskModal(false)}
                      className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 right-4 :hover:text-gray-600"
                    >
                      <Icons.close />
                    </button>
                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium pl-5 pr-[50px]   dark:bg-[#121c2c]">
                      {params.id ? "Edit Task" : "Add Task"}
                    </div>
                    <div className="p-5">
                      <form>
                        <div className="mb-5">
                          <label htmlFor="title">Title</label>
                          <input
                            id="title"
                            type="text"
                            placeholder="Enter Task Title"
                            className="form-input"
                            value={params.title}
                            onChange={(e) => changeValue(e)}
                          />
                        </div>
                        <div className="mb-5">
                          <label htmlFor="assignee">Assignee</label>
                          <select
                            id="assignee"
                            className="form-select"
                            value={params.assignee}
                            onChange={(e) => changeValue(e)}
                          >
                            <option value="">Select Assignee</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Kia Vega">Kia Vega</option>
                            <option value="Sandy Doe">Sandy Doe</option>
                            <option value="Jane Foster">Jane Foster</option>
                            <option value="Donna Frank">Donna Frank</option>
                          </select>
                        </div>
                        <div className="mb-5 flex justify-between gap-4">
                          <div className="flex-1">
                            <label htmlFor="tag">Tag</label>
                            <select
                              id="tag"
                              className="form-select"
                              value={params.tag}
                              onChange={(e) => changeValue(e)}
                            >
                              <option value="">Select Tag</option>
                              <option value="team">Team</option>
                              <option value="update">Update</option>
                            </select>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="priority">Priority</label>
                            <select
                              id="priority"
                              className="form-select"
                              value={params.priority}
                              onChange={(e) => changeValue(e)}
                            >
                              <option value="">Select Priority</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-5">
                          <label>Description</label>
                          <ReactQuill
                            theme="snow"
                            value={params.description}
                            defaultValue={params.description}
                            onChange={(content, delta, source, editor) => {
                              params.description = content;
                              params.descriptionText = editor.getText();
                              setParams({
                                ...params,
                              });
                            }}
                            style={{ minHeight: "200px" }}
                          />
                        </div>
                        <div className="mt-8 flex items-center justify-end text-right ">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => setAddTaskModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary ml-4 rtl:mr-4"
                            onClick={() => saveTask()}
                          >
                            {params.id ? "Update" : "Add"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={viewTaskModal} as={Fragment}>
          <Dialog
            as="div"
            open={viewTaskModal}
            onClose={() => setViewTaskModal(false)}
            className="relative z-50"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[black]/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center px-4 py-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                    <button
                      type="button"
                      onClick={() => setViewTaskModal(false)}
                      className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 right-4 :hover:text-gray-600"
                    >
                      <Icons.close />
                    </button>
                    <div className="flex flex-wrap items-center gap-2 bg-[#fbfbfb] py-3 text-lg font-medium pl-5 pr-[50px]   dark:bg-[#121c2c]">
                      <div>{selectedTask.title}</div>
                      {selectedTask.priority && (
                        <div
                          className={`badge rounded-3xl capitalize ${
                            selectedTask.priority === "medium"
                              ? "badge-outline-primary"
                              : selectedTask.priority === "low"
                              ? "badge-outline-warning "
                              : selectedTask.priority === "high"
                              ? "badge-outline-danger "
                              : ""
                          }`}
                        >
                          {selectedTask.priority}
                        </div>
                      )}
                      {selectedTask.tag && (
                        <div
                          className={`badge rounded-3xl capitalize ${
                            selectedTask.tag === "team"
                              ? "badge-outline-success"
                              : selectedTask.tag === "update"
                              ? "badge-outline-info "
                              : ""
                          }`}
                        >
                          {selectedTask.tag}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div
                        className="prose text-base"
                        dangerouslySetInnerHTML={{
                          __html: selectedTask.description,
                        }}
                      ></div>
                      <div className="mt-8 flex items-center justify-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => setViewTaskModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default ComponentsAppsTodoList;
