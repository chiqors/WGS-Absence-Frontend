import React from "react";
import { Link } from "react-router-dom";

const AdminBreadcrumb = (props) => {
  return (
    <nav className="rounded-md w-full">
      <ol className="list-reset flex">
        {props.items.map((item, index) => (
          <li key={index}>
            <Link to={item.href} className="text-blue-500 hover:text-blue-600">
              {item.title}
            </Link>
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
