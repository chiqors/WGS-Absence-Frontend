import React from "react";

const AdminBreadcrumb = (props) => {
  return (
    <nav className="rounded-md w-full">
      <ol className="list-reset flex">
        {props.items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="text-blue-600 hover:text-blue-700">
              {item.title}
            </a>
            {index < props.items.length - 1 && (
              <span className="text-gray-500 mx-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default AdminBreadcrumb;
