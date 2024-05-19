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
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { todos } from "@/data/todo";
import { ITodo } from "@/types";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import TodoSidebar from "./todo-sidebar";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import MobileTodoSidebar from "./mobile-sidebar";

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
    <div className="sm:px-8">
      <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
        {/* sidebar */}
     
        <TodoSidebar
          addEditTask={addEditTask}
          allTasks={allTasks}
      
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabChanged={tabChanged}
        />



   
       
        <div className="  flex-1  p-0">
          <div className="flex flex-col ">
           

            {pagedTasks.length ? (
          
                <Table className="">
                  <TableHeader className="w-full flex  flex-col ">
               <div className="flex  flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mr-3">
              <Drawer direction="left"  >
         <DrawerTrigger className="xl:hidden" >
     <MenuIcon className="h-5 w-5" />
    </DrawerTrigger>
    <DrawerContent className="w-[300px] h-full py-0">
    <MobileTodoSidebar
          addEditTask={addEditTask}
          allTasks={allTasks}
    
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabChanged={tabChanged}
        />
    
   </DrawerContent>
  </Drawer>
                <div className="group relative w-full">
                  <Input
                    type="text"
                    className=" !pr-10 min-w-[180px] "
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
              <div className="flex  items-center justify-center sm:flex-auto sm:justify-end">
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
      </TableHeader>
                  <TableBody>

                    
                    
                  </TableBody>
                </Table>
          
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
