// This program just forwards queries and actions to sys_http and it exists for a couple of reasons:
// - sys_http has no persistent log so we can't tell what requests have been made
// - At the moment sys_http has the quirk that it doesn't resolve arbitrary GraphQL queries. It always resolves the the
// full QUERY below so if only `status` is requested, sys_http returns body and headers as well.
import { root, nodes } from "membrane";
const QUERY = "{ status headers body }";

export const Root = {
  get: ({ args }) => nodes.sys_http.get({ ...args }).$query(QUERY),
  post: ({ args }) => nodes.sys_http.post({ ...args }).$invoke(),
  put: ({ args }) => nodes.sys_http.put({ ...args }).$invoke(),
  patch: ({ args }) => nodes.sys_http.patch({ ...args }).$invoke(),
  delete: ({ args }) => nodes.sys_http.delete({ ...args }).$invoke(),
  status: () => "Ready",
  authenticated: ({ args }) => {
    return { api: args?.api, authId: args?.authId };
  },
};

export const Authenticated = {
  createLink: ({ self, args }) => {
    const { api, authId } = self.$argsAt(root.authenticated);
    return nodes.sys_http
      .authenticated({ api, authId })
      .createLink({ ...args })
      .$invoke();
  },
  hasAuthenticated: ({ obj }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .hasAuthenticated()
      .$get();
  },
  get: ({ obj, args }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .get({ ...args })
      .$query(QUERY);
  },
  post: ({ obj, args }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .post({ ...args })
      .$invoke();
  },
  put: ({ obj, args }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .put({ ...args })
      .$invoke();
  },
  patch: ({ obj, args }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .patch({ ...args })
      .$invoke();
  },
  delete: ({ obj, args }) => {
    const { api, authId } = obj;
    return nodes.sys_http
      .authenticated({ api, authId })
      .delete({ ...args })
      .$invoke();
  },
};
