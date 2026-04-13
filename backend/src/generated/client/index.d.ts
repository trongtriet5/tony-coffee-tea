
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductVariant
 * 
 */
export type ProductVariant = $Result.DefaultSelection<Prisma.$ProductVariantPayload>
/**
 * Model Topping
 * 
 */
export type Topping = $Result.DefaultSelection<Prisma.$ToppingPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model OrderItemTopping
 * 
 */
export type OrderItemTopping = $Result.DefaultSelection<Prisma.$OrderItemToppingPayload>
/**
 * Model Material
 * 
 */
export type Material = $Result.DefaultSelection<Prisma.$MaterialPayload>
/**
 * Model MaterialTransaction
 * 
 */
export type MaterialTransaction = $Result.DefaultSelection<Prisma.$MaterialTransactionPayload>
/**
 * Model ProductRecipe
 * 
 */
export type ProductRecipe = $Result.DefaultSelection<Prisma.$ProductRecipePayload>
/**
 * Model ToppingRecipe
 * 
 */
export type ToppingRecipe = $Result.DefaultSelection<Prisma.$ToppingRecipePayload>
/**
 * Model Table
 * 
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Branches
 * const branches = await prisma.branch.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Branches
   * const branches = await prisma.branch.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariants
    * const productVariants = await prisma.productVariant.findMany()
    * ```
    */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.topping`: Exposes CRUD operations for the **Topping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Toppings
    * const toppings = await prisma.topping.findMany()
    * ```
    */
  get topping(): Prisma.ToppingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItemTopping`: Exposes CRUD operations for the **OrderItemTopping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItemToppings
    * const orderItemToppings = await prisma.orderItemTopping.findMany()
    * ```
    */
  get orderItemTopping(): Prisma.OrderItemToppingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.material`: Exposes CRUD operations for the **Material** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Materials
    * const materials = await prisma.material.findMany()
    * ```
    */
  get material(): Prisma.MaterialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materialTransaction`: Exposes CRUD operations for the **MaterialTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaterialTransactions
    * const materialTransactions = await prisma.materialTransaction.findMany()
    * ```
    */
  get materialTransaction(): Prisma.MaterialTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productRecipe`: Exposes CRUD operations for the **ProductRecipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductRecipes
    * const productRecipes = await prisma.productRecipe.findMany()
    * ```
    */
  get productRecipe(): Prisma.ProductRecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.toppingRecipe`: Exposes CRUD operations for the **ToppingRecipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ToppingRecipes
    * const toppingRecipes = await prisma.toppingRecipe.findMany()
    * ```
    */
  get toppingRecipe(): Prisma.ToppingRecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.table`: Exposes CRUD operations for the **Table** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tables
    * const tables = await prisma.table.findMany()
    * ```
    */
  get table(): Prisma.TableDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Branch: 'Branch',
    Product: 'Product',
    ProductVariant: 'ProductVariant',
    Topping: 'Topping',
    Employee: 'Employee',
    Order: 'Order',
    OrderItem: 'OrderItem',
    OrderItemTopping: 'OrderItemTopping',
    Material: 'Material',
    MaterialTransaction: 'MaterialTransaction',
    ProductRecipe: 'ProductRecipe',
    ToppingRecipe: 'ToppingRecipe',
    Table: 'Table'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "branch" | "product" | "productVariant" | "topping" | "employee" | "order" | "orderItem" | "orderItemTopping" | "material" | "materialTransaction" | "productRecipe" | "toppingRecipe" | "table"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>
        fields: Prisma.ProductVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariant>
          }
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantCountAggregateOutputType> | number
          }
        }
      }
      Topping: {
        payload: Prisma.$ToppingPayload<ExtArgs>
        fields: Prisma.ToppingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToppingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToppingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          findFirst: {
            args: Prisma.ToppingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToppingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          findMany: {
            args: Prisma.ToppingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>[]
          }
          create: {
            args: Prisma.ToppingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          createMany: {
            args: Prisma.ToppingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToppingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>[]
          }
          delete: {
            args: Prisma.ToppingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          update: {
            args: Prisma.ToppingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          deleteMany: {
            args: Prisma.ToppingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToppingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToppingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>[]
          }
          upsert: {
            args: Prisma.ToppingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingPayload>
          }
          aggregate: {
            args: Prisma.ToppingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopping>
          }
          groupBy: {
            args: Prisma.ToppingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToppingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToppingCountArgs<ExtArgs>
            result: $Utils.Optional<ToppingCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      OrderItemTopping: {
        payload: Prisma.$OrderItemToppingPayload<ExtArgs>
        fields: Prisma.OrderItemToppingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemToppingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemToppingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          findFirst: {
            args: Prisma.OrderItemToppingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemToppingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          findMany: {
            args: Prisma.OrderItemToppingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>[]
          }
          create: {
            args: Prisma.OrderItemToppingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          createMany: {
            args: Prisma.OrderItemToppingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemToppingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>[]
          }
          delete: {
            args: Prisma.OrderItemToppingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          update: {
            args: Prisma.OrderItemToppingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemToppingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemToppingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemToppingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemToppingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemToppingPayload>
          }
          aggregate: {
            args: Prisma.OrderItemToppingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItemTopping>
          }
          groupBy: {
            args: Prisma.OrderItemToppingGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemToppingGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemToppingCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemToppingCountAggregateOutputType> | number
          }
        }
      }
      Material: {
        payload: Prisma.$MaterialPayload<ExtArgs>
        fields: Prisma.MaterialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findFirst: {
            args: Prisma.MaterialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findMany: {
            args: Prisma.MaterialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          create: {
            args: Prisma.MaterialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          createMany: {
            args: Prisma.MaterialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          delete: {
            args: Prisma.MaterialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          update: {
            args: Prisma.MaterialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          deleteMany: {
            args: Prisma.MaterialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          upsert: {
            args: Prisma.MaterialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          aggregate: {
            args: Prisma.MaterialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterial>
          }
          groupBy: {
            args: Prisma.MaterialGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialCountAggregateOutputType> | number
          }
        }
      }
      MaterialTransaction: {
        payload: Prisma.$MaterialTransactionPayload<ExtArgs>
        fields: Prisma.MaterialTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          findFirst: {
            args: Prisma.MaterialTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          findMany: {
            args: Prisma.MaterialTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>[]
          }
          create: {
            args: Prisma.MaterialTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          createMany: {
            args: Prisma.MaterialTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>[]
          }
          delete: {
            args: Prisma.MaterialTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          update: {
            args: Prisma.MaterialTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          deleteMany: {
            args: Prisma.MaterialTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>[]
          }
          upsert: {
            args: Prisma.MaterialTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialTransactionPayload>
          }
          aggregate: {
            args: Prisma.MaterialTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterialTransaction>
          }
          groupBy: {
            args: Prisma.MaterialTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialTransactionCountAggregateOutputType> | number
          }
        }
      }
      ProductRecipe: {
        payload: Prisma.$ProductRecipePayload<ExtArgs>
        fields: Prisma.ProductRecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductRecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductRecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          findFirst: {
            args: Prisma.ProductRecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductRecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          findMany: {
            args: Prisma.ProductRecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>[]
          }
          create: {
            args: Prisma.ProductRecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          createMany: {
            args: Prisma.ProductRecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductRecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>[]
          }
          delete: {
            args: Prisma.ProductRecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          update: {
            args: Prisma.ProductRecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          deleteMany: {
            args: Prisma.ProductRecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductRecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductRecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>[]
          }
          upsert: {
            args: Prisma.ProductRecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRecipePayload>
          }
          aggregate: {
            args: Prisma.ProductRecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductRecipe>
          }
          groupBy: {
            args: Prisma.ProductRecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductRecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductRecipeCountArgs<ExtArgs>
            result: $Utils.Optional<ProductRecipeCountAggregateOutputType> | number
          }
        }
      }
      ToppingRecipe: {
        payload: Prisma.$ToppingRecipePayload<ExtArgs>
        fields: Prisma.ToppingRecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ToppingRecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ToppingRecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          findFirst: {
            args: Prisma.ToppingRecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ToppingRecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          findMany: {
            args: Prisma.ToppingRecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>[]
          }
          create: {
            args: Prisma.ToppingRecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          createMany: {
            args: Prisma.ToppingRecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ToppingRecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>[]
          }
          delete: {
            args: Prisma.ToppingRecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          update: {
            args: Prisma.ToppingRecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          deleteMany: {
            args: Prisma.ToppingRecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ToppingRecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ToppingRecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>[]
          }
          upsert: {
            args: Prisma.ToppingRecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ToppingRecipePayload>
          }
          aggregate: {
            args: Prisma.ToppingRecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToppingRecipe>
          }
          groupBy: {
            args: Prisma.ToppingRecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ToppingRecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ToppingRecipeCountArgs<ExtArgs>
            result: $Utils.Optional<ToppingRecipeCountAggregateOutputType> | number
          }
        }
      }
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>
        fields: Prisma.TableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTable>
          }
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableCountArgs<ExtArgs>
            result: $Utils.Optional<TableCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    branch?: BranchOmit
    product?: ProductOmit
    productVariant?: ProductVariantOmit
    topping?: ToppingOmit
    employee?: EmployeeOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    orderItemTopping?: OrderItemToppingOmit
    material?: MaterialOmit
    materialTransaction?: MaterialTransactionOmit
    productRecipe?: ProductRecipeOmit
    toppingRecipe?: ToppingRecipeOmit
    table?: TableOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BranchCountOutputType
   */

  export type BranchCountOutputType = {
    orders: number
    employees: number
    materials: number
    tables: number
  }

  export type BranchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | BranchCountOutputTypeCountOrdersArgs
    employees?: boolean | BranchCountOutputTypeCountEmployeesArgs
    materials?: boolean | BranchCountOutputTypeCountMaterialsArgs
    tables?: boolean | BranchCountOutputTypeCountTablesArgs
  }

  // Custom InputTypes
  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchCountOutputType
     */
    select?: BranchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialWhereInput
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    order_items: number
    variants: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | ProductCountOutputTypeCountOrder_itemsArgs
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrder_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }


  /**
   * Count Type ProductVariantCountOutputType
   */

  export type ProductVariantCountOutputType = {
    order_items: number
    recipes: number
  }

  export type ProductVariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | ProductVariantCountOutputTypeCountOrder_itemsArgs
    recipes?: boolean | ProductVariantCountOutputTypeCountRecipesArgs
  }

  // Custom InputTypes
  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariantCountOutputType
     */
    select?: ProductVariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountOrder_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductRecipeWhereInput
  }


  /**
   * Count Type ToppingCountOutputType
   */

  export type ToppingCountOutputType = {
    order_items: number
    recipes: number
  }

  export type ToppingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | ToppingCountOutputTypeCountOrder_itemsArgs
    recipes?: boolean | ToppingCountOutputTypeCountRecipesArgs
  }

  // Custom InputTypes
  /**
   * ToppingCountOutputType without action
   */
  export type ToppingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingCountOutputType
     */
    select?: ToppingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ToppingCountOutputType without action
   */
  export type ToppingCountOutputTypeCountOrder_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemToppingWhereInput
  }

  /**
   * ToppingCountOutputType without action
   */
  export type ToppingCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToppingRecipeWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderItemCountOutputType
   */

  export type OrderItemCountOutputType = {
    toppings: number
  }

  export type OrderItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    toppings?: boolean | OrderItemCountOutputTypeCountToppingsArgs
  }

  // Custom InputTypes
  /**
   * OrderItemCountOutputType without action
   */
  export type OrderItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemCountOutputType
     */
    select?: OrderItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderItemCountOutputType without action
   */
  export type OrderItemCountOutputTypeCountToppingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemToppingWhereInput
  }


  /**
   * Count Type MaterialCountOutputType
   */

  export type MaterialCountOutputType = {
    transactions: number
    product_recipes: number
    topping_recipes: number
  }

  export type MaterialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | MaterialCountOutputTypeCountTransactionsArgs
    product_recipes?: boolean | MaterialCountOutputTypeCountProduct_recipesArgs
    topping_recipes?: boolean | MaterialCountOutputTypeCountTopping_recipesArgs
  }

  // Custom InputTypes
  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCountOutputType
     */
    select?: MaterialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialTransactionWhereInput
  }

  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeCountProduct_recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductRecipeWhereInput
  }

  /**
   * MaterialCountOutputType without action
   */
  export type MaterialCountOutputTypeCountTopping_recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToppingRecipeWhereInput
  }


  /**
   * Count Type TableCountOutputType
   */

  export type TableCountOutputType = {
    orders: number
  }

  export type TableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | TableCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableCountOutputType
     */
    select?: TableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    created_at: Date | null
  }

  export type BranchMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    created_at: Date | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    created_at: number
    _all: number
  }


  export type BranchMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    created_at?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    created_at?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    created_at?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: string
    name: string
    address: string | null
    phone: string | null
    created_at: Date
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    created_at?: boolean
    orders?: boolean | Branch$ordersArgs<ExtArgs>
    employees?: boolean | Branch$employeesArgs<ExtArgs>
    materials?: boolean | Branch$materialsArgs<ExtArgs>
    tables?: boolean | Branch$tablesArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    created_at?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "created_at", ExtArgs["result"]["branch"]>
  export type BranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Branch$ordersArgs<ExtArgs>
    employees?: boolean | Branch$employeesArgs<ExtArgs>
    materials?: boolean | Branch$materialsArgs<ExtArgs>
    tables?: boolean | Branch$tablesArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BranchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BranchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      employees: Prisma.$EmployeePayload<ExtArgs>[]
      materials: Prisma.$MaterialPayload<ExtArgs>[]
      tables: Prisma.$TablePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      phone: string | null
      created_at: Date
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Branch$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Branch$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employees<T extends Branch$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Branch$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    materials<T extends Branch$materialsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$materialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tables<T extends Branch$tablesArgs<ExtArgs> = {}>(args?: Subset<T, Branch$tablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'String'>
    readonly name: FieldRef<"Branch", 'String'>
    readonly address: FieldRef<"Branch", 'String'>
    readonly phone: FieldRef<"Branch", 'String'>
    readonly created_at: FieldRef<"Branch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch.orders
   */
  export type Branch$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Branch.employees
   */
  export type Branch$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Branch.materials
   */
  export type Branch$materialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    where?: MaterialWhereInput
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    cursor?: MaterialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Branch.tables
   */
  export type Branch$tablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    where?: TableWhereInput
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    cursor?: TableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name_vi: string | null
    name_en: string | null
    category: string | null
    available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name_vi: string | null
    name_en: string | null
    category: string | null
    available: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name_vi: number
    name_en: number
    category: number
    available: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    name_vi?: true
    name_en?: true
    category?: true
    available?: true
    created_at?: true
    updated_at?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name_vi?: true
    name_en?: true
    category?: true
    available?: true
    created_at?: true
    updated_at?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name_vi?: true
    name_en?: true
    category?: true
    available?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name_vi: string
    name_en: string
    category: string
    available: boolean
    created_at: Date
    updated_at: Date
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_vi?: boolean
    name_en?: boolean
    category?: boolean
    available?: boolean
    created_at?: boolean
    updated_at?: boolean
    order_items?: boolean | Product$order_itemsArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_vi?: boolean
    name_en?: boolean
    category?: boolean
    available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_vi?: boolean
    name_en?: boolean
    category?: boolean
    available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name_vi?: boolean
    name_en?: boolean
    category?: boolean
    available?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name_vi" | "name_en" | "category" | "available" | "created_at" | "updated_at", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | Product$order_itemsArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      order_items: Prisma.$OrderItemPayload<ExtArgs>[]
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name_vi: string
      name_en: string
      category: string
      available: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order_items<T extends Product$order_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name_vi: FieldRef<"Product", 'String'>
    readonly name_en: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly available: FieldRef<"Product", 'Boolean'>
    readonly created_at: FieldRef<"Product", 'DateTime'>
    readonly updated_at: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.order_items
   */
  export type Product$order_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  export type ProductVariantAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductVariantSumAggregateOutputType = {
    price: number | null
  }

  export type ProductVariantMinAggregateOutputType = {
    id: string | null
    product_id: string | null
    size: string | null
    price: number | null
  }

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null
    product_id: string | null
    size: string | null
    price: number | null
  }

  export type ProductVariantCountAggregateOutputType = {
    id: number
    product_id: number
    size: number
    price: number
    _all: number
  }


  export type ProductVariantAvgAggregateInputType = {
    price?: true
  }

  export type ProductVariantSumAggregateInputType = {
    price?: true
  }

  export type ProductVariantMinAggregateInputType = {
    id?: true
    product_id?: true
    size?: true
    price?: true
  }

  export type ProductVariantMaxAggregateInputType = {
    id?: true
    product_id?: true
    size?: true
    price?: true
  }

  export type ProductVariantCountAggregateInputType = {
    id?: true
    product_id?: true
    size?: true
    price?: true
    _all?: true
  }

  export type ProductVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariants
    **/
    _count?: true | ProductVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariantMaxAggregateInputType
  }

  export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>
  }




  export type ProductVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithAggregationInput | ProductVariantOrderByWithAggregationInput[]
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum
    having?: ProductVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariantCountAggregateInputType | true
    _avg?: ProductVariantAvgAggregateInputType
    _sum?: ProductVariantSumAggregateInputType
    _min?: ProductVariantMinAggregateInputType
    _max?: ProductVariantMaxAggregateInputType
  }

  export type ProductVariantGroupByOutputType = {
    id: string
    product_id: string
    size: string
    price: number
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    size?: boolean
    price?: boolean
    order_items?: boolean | ProductVariant$order_itemsArgs<ExtArgs>
    recipes?: boolean | ProductVariant$recipesArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    size?: boolean
    price?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    product_id?: boolean
    size?: boolean
    price?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectScalar = {
    id?: boolean
    product_id?: boolean
    size?: boolean
    price?: boolean
  }

  export type ProductVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "product_id" | "size" | "price", ExtArgs["result"]["productVariant"]>
  export type ProductVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | ProductVariant$order_itemsArgs<ExtArgs>
    recipes?: boolean | ProductVariant$recipesArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariant"
    objects: {
      order_items: Prisma.$OrderItemPayload<ExtArgs>[]
      recipes: Prisma.$ProductRecipePayload<ExtArgs>[]
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      product_id: string
      size: string
      price: number
    }, ExtArgs["result"]["productVariant"]>
    composites: {}
  }

  type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = $Result.GetResult<Prisma.$ProductVariantPayload, S>

  type ProductVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductVariantCountAggregateInputType | true
    }

  export interface ProductVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'], meta: { name: 'ProductVariant' } }
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     * 
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariantFindManyArgs>(args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     * 
     */
    create<T extends ProductVariantCreateArgs>(args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariantCreateManyArgs>(args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     * 
     */
    delete<T extends ProductVariantDeleteArgs>(args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariantUpdateArgs>(args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants and returns the data updated in the database.
     * @param {ProductVariantUpdateManyAndReturnArgs} args - Arguments to update many ProductVariants.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
    **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductVariantAggregateArgs>(args: Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariant model
   */
  readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order_items<T extends ProductVariant$order_itemsArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recipes<T extends ProductVariant$recipesArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", 'String'>
    readonly product_id: FieldRef<"ProductVariant", 'String'>
    readonly size: FieldRef<"ProductVariant", 'String'>
    readonly price: FieldRef<"ProductVariant", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
  }

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
  }

  /**
   * ProductVariant updateManyAndReturn
   */
  export type ProductVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
  }

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to delete.
     */
    limit?: number
  }

  /**
   * ProductVariant.order_items
   */
  export type ProductVariant$order_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * ProductVariant.recipes
   */
  export type ProductVariant$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    where?: ProductRecipeWhereInput
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    cursor?: ProductRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductRecipeScalarFieldEnum | ProductRecipeScalarFieldEnum[]
  }

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
  }


  /**
   * Model Topping
   */

  export type AggregateTopping = {
    _count: ToppingCountAggregateOutputType | null
    _avg: ToppingAvgAggregateOutputType | null
    _sum: ToppingSumAggregateOutputType | null
    _min: ToppingMinAggregateOutputType | null
    _max: ToppingMaxAggregateOutputType | null
  }

  export type ToppingAvgAggregateOutputType = {
    price: number | null
  }

  export type ToppingSumAggregateOutputType = {
    price: number | null
  }

  export type ToppingMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    available: boolean | null
  }

  export type ToppingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    available: boolean | null
  }

  export type ToppingCountAggregateOutputType = {
    id: number
    name: number
    price: number
    available: number
    _all: number
  }


  export type ToppingAvgAggregateInputType = {
    price?: true
  }

  export type ToppingSumAggregateInputType = {
    price?: true
  }

  export type ToppingMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    available?: true
  }

  export type ToppingMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    available?: true
  }

  export type ToppingCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    available?: true
    _all?: true
  }

  export type ToppingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Topping to aggregate.
     */
    where?: ToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toppings to fetch.
     */
    orderBy?: ToppingOrderByWithRelationInput | ToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Toppings
    **/
    _count?: true | ToppingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ToppingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ToppingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToppingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToppingMaxAggregateInputType
  }

  export type GetToppingAggregateType<T extends ToppingAggregateArgs> = {
        [P in keyof T & keyof AggregateTopping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopping[P]>
      : GetScalarType<T[P], AggregateTopping[P]>
  }




  export type ToppingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToppingWhereInput
    orderBy?: ToppingOrderByWithAggregationInput | ToppingOrderByWithAggregationInput[]
    by: ToppingScalarFieldEnum[] | ToppingScalarFieldEnum
    having?: ToppingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToppingCountAggregateInputType | true
    _avg?: ToppingAvgAggregateInputType
    _sum?: ToppingSumAggregateInputType
    _min?: ToppingMinAggregateInputType
    _max?: ToppingMaxAggregateInputType
  }

  export type ToppingGroupByOutputType = {
    id: string
    name: string
    price: number
    available: boolean
    _count: ToppingCountAggregateOutputType | null
    _avg: ToppingAvgAggregateOutputType | null
    _sum: ToppingSumAggregateOutputType | null
    _min: ToppingMinAggregateOutputType | null
    _max: ToppingMaxAggregateOutputType | null
  }

  type GetToppingGroupByPayload<T extends ToppingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToppingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToppingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToppingGroupByOutputType[P]>
            : GetScalarType<T[P], ToppingGroupByOutputType[P]>
        }
      >
    >


  export type ToppingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    available?: boolean
    order_items?: boolean | Topping$order_itemsArgs<ExtArgs>
    recipes?: boolean | Topping$recipesArgs<ExtArgs>
    _count?: boolean | ToppingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topping"]>

  export type ToppingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    available?: boolean
  }, ExtArgs["result"]["topping"]>

  export type ToppingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    available?: boolean
  }, ExtArgs["result"]["topping"]>

  export type ToppingSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    available?: boolean
  }

  export type ToppingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "available", ExtArgs["result"]["topping"]>
  export type ToppingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | Topping$order_itemsArgs<ExtArgs>
    recipes?: boolean | Topping$recipesArgs<ExtArgs>
    _count?: boolean | ToppingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ToppingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ToppingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ToppingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Topping"
    objects: {
      order_items: Prisma.$OrderItemToppingPayload<ExtArgs>[]
      recipes: Prisma.$ToppingRecipePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      available: boolean
    }, ExtArgs["result"]["topping"]>
    composites: {}
  }

  type ToppingGetPayload<S extends boolean | null | undefined | ToppingDefaultArgs> = $Result.GetResult<Prisma.$ToppingPayload, S>

  type ToppingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToppingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToppingCountAggregateInputType | true
    }

  export interface ToppingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Topping'], meta: { name: 'Topping' } }
    /**
     * Find zero or one Topping that matches the filter.
     * @param {ToppingFindUniqueArgs} args - Arguments to find a Topping
     * @example
     * // Get one Topping
     * const topping = await prisma.topping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToppingFindUniqueArgs>(args: SelectSubset<T, ToppingFindUniqueArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Topping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToppingFindUniqueOrThrowArgs} args - Arguments to find a Topping
     * @example
     * // Get one Topping
     * const topping = await prisma.topping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToppingFindUniqueOrThrowArgs>(args: SelectSubset<T, ToppingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingFindFirstArgs} args - Arguments to find a Topping
     * @example
     * // Get one Topping
     * const topping = await prisma.topping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToppingFindFirstArgs>(args?: SelectSubset<T, ToppingFindFirstArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingFindFirstOrThrowArgs} args - Arguments to find a Topping
     * @example
     * // Get one Topping
     * const topping = await prisma.topping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToppingFindFirstOrThrowArgs>(args?: SelectSubset<T, ToppingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Toppings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Toppings
     * const toppings = await prisma.topping.findMany()
     * 
     * // Get first 10 Toppings
     * const toppings = await prisma.topping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const toppingWithIdOnly = await prisma.topping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ToppingFindManyArgs>(args?: SelectSubset<T, ToppingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Topping.
     * @param {ToppingCreateArgs} args - Arguments to create a Topping.
     * @example
     * // Create one Topping
     * const Topping = await prisma.topping.create({
     *   data: {
     *     // ... data to create a Topping
     *   }
     * })
     * 
     */
    create<T extends ToppingCreateArgs>(args: SelectSubset<T, ToppingCreateArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Toppings.
     * @param {ToppingCreateManyArgs} args - Arguments to create many Toppings.
     * @example
     * // Create many Toppings
     * const topping = await prisma.topping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToppingCreateManyArgs>(args?: SelectSubset<T, ToppingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Toppings and returns the data saved in the database.
     * @param {ToppingCreateManyAndReturnArgs} args - Arguments to create many Toppings.
     * @example
     * // Create many Toppings
     * const topping = await prisma.topping.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Toppings and only return the `id`
     * const toppingWithIdOnly = await prisma.topping.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToppingCreateManyAndReturnArgs>(args?: SelectSubset<T, ToppingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Topping.
     * @param {ToppingDeleteArgs} args - Arguments to delete one Topping.
     * @example
     * // Delete one Topping
     * const Topping = await prisma.topping.delete({
     *   where: {
     *     // ... filter to delete one Topping
     *   }
     * })
     * 
     */
    delete<T extends ToppingDeleteArgs>(args: SelectSubset<T, ToppingDeleteArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Topping.
     * @param {ToppingUpdateArgs} args - Arguments to update one Topping.
     * @example
     * // Update one Topping
     * const topping = await prisma.topping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToppingUpdateArgs>(args: SelectSubset<T, ToppingUpdateArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Toppings.
     * @param {ToppingDeleteManyArgs} args - Arguments to filter Toppings to delete.
     * @example
     * // Delete a few Toppings
     * const { count } = await prisma.topping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToppingDeleteManyArgs>(args?: SelectSubset<T, ToppingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Toppings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Toppings
     * const topping = await prisma.topping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToppingUpdateManyArgs>(args: SelectSubset<T, ToppingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Toppings and returns the data updated in the database.
     * @param {ToppingUpdateManyAndReturnArgs} args - Arguments to update many Toppings.
     * @example
     * // Update many Toppings
     * const topping = await prisma.topping.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Toppings and only return the `id`
     * const toppingWithIdOnly = await prisma.topping.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToppingUpdateManyAndReturnArgs>(args: SelectSubset<T, ToppingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Topping.
     * @param {ToppingUpsertArgs} args - Arguments to update or create a Topping.
     * @example
     * // Update or create a Topping
     * const topping = await prisma.topping.upsert({
     *   create: {
     *     // ... data to create a Topping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Topping we want to update
     *   }
     * })
     */
    upsert<T extends ToppingUpsertArgs>(args: SelectSubset<T, ToppingUpsertArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Toppings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingCountArgs} args - Arguments to filter Toppings to count.
     * @example
     * // Count the number of Toppings
     * const count = await prisma.topping.count({
     *   where: {
     *     // ... the filter for the Toppings we want to count
     *   }
     * })
    **/
    count<T extends ToppingCountArgs>(
      args?: Subset<T, ToppingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToppingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Topping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToppingAggregateArgs>(args: Subset<T, ToppingAggregateArgs>): Prisma.PrismaPromise<GetToppingAggregateType<T>>

    /**
     * Group by Topping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToppingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToppingGroupByArgs['orderBy'] }
        : { orderBy?: ToppingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToppingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToppingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Topping model
   */
  readonly fields: ToppingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Topping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToppingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order_items<T extends Topping$order_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Topping$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recipes<T extends Topping$recipesArgs<ExtArgs> = {}>(args?: Subset<T, Topping$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Topping model
   */
  interface ToppingFieldRefs {
    readonly id: FieldRef<"Topping", 'String'>
    readonly name: FieldRef<"Topping", 'String'>
    readonly price: FieldRef<"Topping", 'Float'>
    readonly available: FieldRef<"Topping", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Topping findUnique
   */
  export type ToppingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter, which Topping to fetch.
     */
    where: ToppingWhereUniqueInput
  }

  /**
   * Topping findUniqueOrThrow
   */
  export type ToppingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter, which Topping to fetch.
     */
    where: ToppingWhereUniqueInput
  }

  /**
   * Topping findFirst
   */
  export type ToppingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter, which Topping to fetch.
     */
    where?: ToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toppings to fetch.
     */
    orderBy?: ToppingOrderByWithRelationInput | ToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Toppings.
     */
    cursor?: ToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Toppings.
     */
    distinct?: ToppingScalarFieldEnum | ToppingScalarFieldEnum[]
  }

  /**
   * Topping findFirstOrThrow
   */
  export type ToppingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter, which Topping to fetch.
     */
    where?: ToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toppings to fetch.
     */
    orderBy?: ToppingOrderByWithRelationInput | ToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Toppings.
     */
    cursor?: ToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Toppings.
     */
    distinct?: ToppingScalarFieldEnum | ToppingScalarFieldEnum[]
  }

  /**
   * Topping findMany
   */
  export type ToppingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter, which Toppings to fetch.
     */
    where?: ToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Toppings to fetch.
     */
    orderBy?: ToppingOrderByWithRelationInput | ToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Toppings.
     */
    cursor?: ToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Toppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Toppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Toppings.
     */
    distinct?: ToppingScalarFieldEnum | ToppingScalarFieldEnum[]
  }

  /**
   * Topping create
   */
  export type ToppingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * The data needed to create a Topping.
     */
    data: XOR<ToppingCreateInput, ToppingUncheckedCreateInput>
  }

  /**
   * Topping createMany
   */
  export type ToppingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Toppings.
     */
    data: ToppingCreateManyInput | ToppingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Topping createManyAndReturn
   */
  export type ToppingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * The data used to create many Toppings.
     */
    data: ToppingCreateManyInput | ToppingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Topping update
   */
  export type ToppingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * The data needed to update a Topping.
     */
    data: XOR<ToppingUpdateInput, ToppingUncheckedUpdateInput>
    /**
     * Choose, which Topping to update.
     */
    where: ToppingWhereUniqueInput
  }

  /**
   * Topping updateMany
   */
  export type ToppingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Toppings.
     */
    data: XOR<ToppingUpdateManyMutationInput, ToppingUncheckedUpdateManyInput>
    /**
     * Filter which Toppings to update
     */
    where?: ToppingWhereInput
    /**
     * Limit how many Toppings to update.
     */
    limit?: number
  }

  /**
   * Topping updateManyAndReturn
   */
  export type ToppingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * The data used to update Toppings.
     */
    data: XOR<ToppingUpdateManyMutationInput, ToppingUncheckedUpdateManyInput>
    /**
     * Filter which Toppings to update
     */
    where?: ToppingWhereInput
    /**
     * Limit how many Toppings to update.
     */
    limit?: number
  }

  /**
   * Topping upsert
   */
  export type ToppingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * The filter to search for the Topping to update in case it exists.
     */
    where: ToppingWhereUniqueInput
    /**
     * In case the Topping found by the `where` argument doesn't exist, create a new Topping with this data.
     */
    create: XOR<ToppingCreateInput, ToppingUncheckedCreateInput>
    /**
     * In case the Topping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToppingUpdateInput, ToppingUncheckedUpdateInput>
  }

  /**
   * Topping delete
   */
  export type ToppingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
    /**
     * Filter which Topping to delete.
     */
    where: ToppingWhereUniqueInput
  }

  /**
   * Topping deleteMany
   */
  export type ToppingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Toppings to delete
     */
    where?: ToppingWhereInput
    /**
     * Limit how many Toppings to delete.
     */
    limit?: number
  }

  /**
   * Topping.order_items
   */
  export type Topping$order_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    where?: OrderItemToppingWhereInput
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    cursor?: OrderItemToppingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemToppingScalarFieldEnum | OrderItemToppingScalarFieldEnum[]
  }

  /**
   * Topping.recipes
   */
  export type Topping$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    where?: ToppingRecipeWhereInput
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    cursor?: ToppingRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToppingRecipeScalarFieldEnum | ToppingRecipeScalarFieldEnum[]
  }

  /**
   * Topping without action
   */
  export type ToppingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topping
     */
    select?: ToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Topping
     */
    omit?: ToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    position_name: string | null
    role: string | null
    branch_id: string | null
    created_at: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    name: string | null
    position_name: string | null
    role: string | null
    branch_id: string | null
    created_at: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    username: number
    password: number
    name: number
    position_name: number
    role: number
    branch_id: number
    created_at: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    position_name?: true
    role?: true
    branch_id?: true
    created_at?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    position_name?: true
    role?: true
    branch_id?: true
    created_at?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    position_name?: true
    role?: true
    branch_id?: true
    created_at?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    username: string
    password: string
    name: string
    position_name: string
    role: string
    branch_id: string | null
    created_at: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position_name?: boolean
    role?: boolean
    branch_id?: boolean
    created_at?: boolean
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position_name?: boolean
    role?: boolean
    branch_id?: boolean
    created_at?: boolean
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position_name?: boolean
    role?: boolean
    branch_id?: boolean
    created_at?: boolean
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    position_name?: boolean
    role?: boolean
    branch_id?: boolean
    created_at?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "name" | "position_name" | "role" | "branch_id" | "created_at", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Employee$branchArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      name: string
      position_name: string
      role: string
      branch_id: string | null
      created_at: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends Employee$branchArgs<ExtArgs> = {}>(args?: Subset<T, Employee$branchArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly username: FieldRef<"Employee", 'String'>
    readonly password: FieldRef<"Employee", 'String'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly position_name: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'String'>
    readonly branch_id: FieldRef<"Employee", 'String'>
    readonly created_at: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.branch
   */
  export type Employee$branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    total_amount: number | null
    discount_amount: number | null
    final_amount: number | null
    print_count: number | null
  }

  export type OrderSumAggregateOutputType = {
    total_amount: number | null
    discount_amount: number | null
    final_amount: number | null
    print_count: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    order_number: string | null
    total_amount: number | null
    discount_amount: number | null
    final_amount: number | null
    payment_method: string | null
    status: string | null
    order_type: string | null
    source: string | null
    branch_id: string | null
    table_id: string | null
    note: string | null
    created_at: Date | null
    print_count: number | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    order_number: string | null
    total_amount: number | null
    discount_amount: number | null
    final_amount: number | null
    payment_method: string | null
    status: string | null
    order_type: string | null
    source: string | null
    branch_id: string | null
    table_id: string | null
    note: string | null
    created_at: Date | null
    print_count: number | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    order_number: number
    total_amount: number
    discount_amount: number
    final_amount: number
    payment_method: number
    status: number
    order_type: number
    source: number
    branch_id: number
    table_id: number
    note: number
    created_at: number
    print_count: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    total_amount?: true
    discount_amount?: true
    final_amount?: true
    print_count?: true
  }

  export type OrderSumAggregateInputType = {
    total_amount?: true
    discount_amount?: true
    final_amount?: true
    print_count?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    order_number?: true
    total_amount?: true
    discount_amount?: true
    final_amount?: true
    payment_method?: true
    status?: true
    order_type?: true
    source?: true
    branch_id?: true
    table_id?: true
    note?: true
    created_at?: true
    print_count?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    order_number?: true
    total_amount?: true
    discount_amount?: true
    final_amount?: true
    payment_method?: true
    status?: true
    order_type?: true
    source?: true
    branch_id?: true
    table_id?: true
    note?: true
    created_at?: true
    print_count?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    order_number?: true
    total_amount?: true
    discount_amount?: true
    final_amount?: true
    payment_method?: true
    status?: true
    order_type?: true
    source?: true
    branch_id?: true
    table_id?: true
    note?: true
    created_at?: true
    print_count?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    order_number: string
    total_amount: number
    discount_amount: number
    final_amount: number
    payment_method: string
    status: string
    order_type: string
    source: string
    branch_id: string | null
    table_id: string | null
    note: string | null
    created_at: Date
    print_count: number
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_number?: boolean
    total_amount?: boolean
    discount_amount?: boolean
    final_amount?: boolean
    payment_method?: boolean
    status?: boolean
    order_type?: boolean
    source?: boolean
    branch_id?: boolean
    table_id?: boolean
    note?: boolean
    created_at?: boolean
    print_count?: boolean
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_number?: boolean
    total_amount?: boolean
    discount_amount?: boolean
    final_amount?: boolean
    payment_method?: boolean
    status?: boolean
    order_type?: boolean
    source?: boolean
    branch_id?: boolean
    table_id?: boolean
    note?: boolean
    created_at?: boolean
    print_count?: boolean
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_number?: boolean
    total_amount?: boolean
    discount_amount?: boolean
    final_amount?: boolean
    payment_method?: boolean
    status?: boolean
    order_type?: boolean
    source?: boolean
    branch_id?: boolean
    table_id?: boolean
    note?: boolean
    created_at?: boolean
    print_count?: boolean
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    order_number?: boolean
    total_amount?: boolean
    discount_amount?: boolean
    final_amount?: boolean
    payment_method?: boolean
    status?: boolean
    order_type?: boolean
    source?: boolean
    branch_id?: boolean
    table_id?: boolean
    note?: boolean
    created_at?: boolean
    print_count?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order_number" | "total_amount" | "discount_amount" | "final_amount" | "payment_method" | "status" | "order_type" | "source" | "branch_id" | "table_id" | "note" | "created_at" | "print_count", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Order$branchArgs<ExtArgs>
    table?: boolean | Order$tableArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs> | null
      table: Prisma.$TablePayload<ExtArgs> | null
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order_number: string
      total_amount: number
      discount_amount: number
      final_amount: number
      payment_method: string
      status: string
      order_type: string
      source: string
      branch_id: string | null
      table_id: string | null
      note: string | null
      created_at: Date
      print_count: number
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends Order$branchArgs<ExtArgs> = {}>(args?: Subset<T, Order$branchArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    table<T extends Order$tableArgs<ExtArgs> = {}>(args?: Subset<T, Order$tableArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly order_number: FieldRef<"Order", 'String'>
    readonly total_amount: FieldRef<"Order", 'Float'>
    readonly discount_amount: FieldRef<"Order", 'Float'>
    readonly final_amount: FieldRef<"Order", 'Float'>
    readonly payment_method: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly order_type: FieldRef<"Order", 'String'>
    readonly source: FieldRef<"Order", 'String'>
    readonly branch_id: FieldRef<"Order", 'String'>
    readonly table_id: FieldRef<"Order", 'String'>
    readonly note: FieldRef<"Order", 'String'>
    readonly created_at: FieldRef<"Order", 'DateTime'>
    readonly print_count: FieldRef<"Order", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.branch
   */
  export type Order$branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
  }

  /**
   * Order.table
   */
  export type Order$tableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    where?: TableWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    unit_price: number | null
    subtotal: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    unit_price: number | null
    subtotal: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    order_id: string | null
    product_id: string | null
    variant_id: string | null
    quantity: number | null
    unit_price: number | null
    subtotal: number | null
    note: string | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    order_id: string | null
    product_id: string | null
    variant_id: string | null
    quantity: number | null
    unit_price: number | null
    subtotal: number | null
    note: string | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    order_id: number
    product_id: number
    variant_id: number
    quantity: number
    unit_price: number
    subtotal: number
    note: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    unit_price?: true
    subtotal?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    unit_price?: true
    subtotal?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    order_id?: true
    product_id?: true
    variant_id?: true
    quantity?: true
    unit_price?: true
    subtotal?: true
    note?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    order_id?: true
    product_id?: true
    variant_id?: true
    quantity?: true
    unit_price?: true
    subtotal?: true
    note?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    order_id?: true
    product_id?: true
    variant_id?: true
    quantity?: true
    unit_price?: true
    subtotal?: true
    note?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    order_id: string
    product_id: string
    variant_id: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note: string | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_id?: boolean
    product_id?: boolean
    variant_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    subtotal?: boolean
    note?: boolean
    toppings?: boolean | OrderItem$toppingsArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
    _count?: boolean | OrderItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_id?: boolean
    product_id?: boolean
    variant_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    subtotal?: boolean
    note?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_id?: boolean
    product_id?: boolean
    variant_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    subtotal?: boolean
    note?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    order_id?: boolean
    product_id?: boolean
    variant_id?: boolean
    quantity?: boolean
    unit_price?: boolean
    subtotal?: boolean
    note?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order_id" | "product_id" | "variant_id" | "quantity" | "unit_price" | "subtotal" | "note", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    toppings?: boolean | OrderItem$toppingsArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
    _count?: boolean | OrderItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      toppings: Prisma.$OrderItemToppingPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      variant: Prisma.$ProductVariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order_id: string
      product_id: string
      variant_id: string | null
      quantity: number
      unit_price: number
      subtotal: number
      note: string | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    toppings<T extends OrderItem$toppingsArgs<ExtArgs> = {}>(args?: Subset<T, OrderItem$toppingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends OrderItem$variantArgs<ExtArgs> = {}>(args?: Subset<T, OrderItem$variantArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly order_id: FieldRef<"OrderItem", 'String'>
    readonly product_id: FieldRef<"OrderItem", 'String'>
    readonly variant_id: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly unit_price: FieldRef<"OrderItem", 'Float'>
    readonly subtotal: FieldRef<"OrderItem", 'Float'>
    readonly note: FieldRef<"OrderItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem.toppings
   */
  export type OrderItem$toppingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    where?: OrderItemToppingWhereInput
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    cursor?: OrderItemToppingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemToppingScalarFieldEnum | OrderItemToppingScalarFieldEnum[]
  }

  /**
   * OrderItem.variant
   */
  export type OrderItem$variantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model OrderItemTopping
   */

  export type AggregateOrderItemTopping = {
    _count: OrderItemToppingCountAggregateOutputType | null
    _avg: OrderItemToppingAvgAggregateOutputType | null
    _sum: OrderItemToppingSumAggregateOutputType | null
    _min: OrderItemToppingMinAggregateOutputType | null
    _max: OrderItemToppingMaxAggregateOutputType | null
  }

  export type OrderItemToppingAvgAggregateOutputType = {
    price: number | null
  }

  export type OrderItemToppingSumAggregateOutputType = {
    price: number | null
  }

  export type OrderItemToppingMinAggregateOutputType = {
    id: string | null
    order_item_id: string | null
    topping_id: string | null
    name: string | null
    price: number | null
  }

  export type OrderItemToppingMaxAggregateOutputType = {
    id: string | null
    order_item_id: string | null
    topping_id: string | null
    name: string | null
    price: number | null
  }

  export type OrderItemToppingCountAggregateOutputType = {
    id: number
    order_item_id: number
    topping_id: number
    name: number
    price: number
    _all: number
  }


  export type OrderItemToppingAvgAggregateInputType = {
    price?: true
  }

  export type OrderItemToppingSumAggregateInputType = {
    price?: true
  }

  export type OrderItemToppingMinAggregateInputType = {
    id?: true
    order_item_id?: true
    topping_id?: true
    name?: true
    price?: true
  }

  export type OrderItemToppingMaxAggregateInputType = {
    id?: true
    order_item_id?: true
    topping_id?: true
    name?: true
    price?: true
  }

  export type OrderItemToppingCountAggregateInputType = {
    id?: true
    order_item_id?: true
    topping_id?: true
    name?: true
    price?: true
    _all?: true
  }

  export type OrderItemToppingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItemTopping to aggregate.
     */
    where?: OrderItemToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItemToppings to fetch.
     */
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItemToppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItemToppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItemToppings
    **/
    _count?: true | OrderItemToppingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemToppingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemToppingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemToppingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemToppingMaxAggregateInputType
  }

  export type GetOrderItemToppingAggregateType<T extends OrderItemToppingAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItemTopping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItemTopping[P]>
      : GetScalarType<T[P], AggregateOrderItemTopping[P]>
  }




  export type OrderItemToppingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemToppingWhereInput
    orderBy?: OrderItemToppingOrderByWithAggregationInput | OrderItemToppingOrderByWithAggregationInput[]
    by: OrderItemToppingScalarFieldEnum[] | OrderItemToppingScalarFieldEnum
    having?: OrderItemToppingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemToppingCountAggregateInputType | true
    _avg?: OrderItemToppingAvgAggregateInputType
    _sum?: OrderItemToppingSumAggregateInputType
    _min?: OrderItemToppingMinAggregateInputType
    _max?: OrderItemToppingMaxAggregateInputType
  }

  export type OrderItemToppingGroupByOutputType = {
    id: string
    order_item_id: string
    topping_id: string
    name: string
    price: number
    _count: OrderItemToppingCountAggregateOutputType | null
    _avg: OrderItemToppingAvgAggregateOutputType | null
    _sum: OrderItemToppingSumAggregateOutputType | null
    _min: OrderItemToppingMinAggregateOutputType | null
    _max: OrderItemToppingMaxAggregateOutputType | null
  }

  type GetOrderItemToppingGroupByPayload<T extends OrderItemToppingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemToppingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemToppingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemToppingGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemToppingGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemToppingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_item_id?: boolean
    topping_id?: boolean
    name?: boolean
    price?: boolean
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItemTopping"]>

  export type OrderItemToppingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_item_id?: boolean
    topping_id?: boolean
    name?: boolean
    price?: boolean
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItemTopping"]>

  export type OrderItemToppingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order_item_id?: boolean
    topping_id?: boolean
    name?: boolean
    price?: boolean
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItemTopping"]>

  export type OrderItemToppingSelectScalar = {
    id?: boolean
    order_item_id?: boolean
    topping_id?: boolean
    name?: boolean
    price?: boolean
  }

  export type OrderItemToppingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order_item_id" | "topping_id" | "name" | "price", ExtArgs["result"]["orderItemTopping"]>
  export type OrderItemToppingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }
  export type OrderItemToppingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }
  export type OrderItemToppingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_item?: boolean | OrderItemDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }

  export type $OrderItemToppingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItemTopping"
    objects: {
      order_item: Prisma.$OrderItemPayload<ExtArgs>
      topping: Prisma.$ToppingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      order_item_id: string
      topping_id: string
      name: string
      price: number
    }, ExtArgs["result"]["orderItemTopping"]>
    composites: {}
  }

  type OrderItemToppingGetPayload<S extends boolean | null | undefined | OrderItemToppingDefaultArgs> = $Result.GetResult<Prisma.$OrderItemToppingPayload, S>

  type OrderItemToppingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemToppingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemToppingCountAggregateInputType | true
    }

  export interface OrderItemToppingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItemTopping'], meta: { name: 'OrderItemTopping' } }
    /**
     * Find zero or one OrderItemTopping that matches the filter.
     * @param {OrderItemToppingFindUniqueArgs} args - Arguments to find a OrderItemTopping
     * @example
     * // Get one OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemToppingFindUniqueArgs>(args: SelectSubset<T, OrderItemToppingFindUniqueArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItemTopping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemToppingFindUniqueOrThrowArgs} args - Arguments to find a OrderItemTopping
     * @example
     * // Get one OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemToppingFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemToppingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItemTopping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingFindFirstArgs} args - Arguments to find a OrderItemTopping
     * @example
     * // Get one OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemToppingFindFirstArgs>(args?: SelectSubset<T, OrderItemToppingFindFirstArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItemTopping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingFindFirstOrThrowArgs} args - Arguments to find a OrderItemTopping
     * @example
     * // Get one OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemToppingFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemToppingFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItemToppings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItemToppings
     * const orderItemToppings = await prisma.orderItemTopping.findMany()
     * 
     * // Get first 10 OrderItemToppings
     * const orderItemToppings = await prisma.orderItemTopping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemToppingWithIdOnly = await prisma.orderItemTopping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemToppingFindManyArgs>(args?: SelectSubset<T, OrderItemToppingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItemTopping.
     * @param {OrderItemToppingCreateArgs} args - Arguments to create a OrderItemTopping.
     * @example
     * // Create one OrderItemTopping
     * const OrderItemTopping = await prisma.orderItemTopping.create({
     *   data: {
     *     // ... data to create a OrderItemTopping
     *   }
     * })
     * 
     */
    create<T extends OrderItemToppingCreateArgs>(args: SelectSubset<T, OrderItemToppingCreateArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItemToppings.
     * @param {OrderItemToppingCreateManyArgs} args - Arguments to create many OrderItemToppings.
     * @example
     * // Create many OrderItemToppings
     * const orderItemTopping = await prisma.orderItemTopping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemToppingCreateManyArgs>(args?: SelectSubset<T, OrderItemToppingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItemToppings and returns the data saved in the database.
     * @param {OrderItemToppingCreateManyAndReturnArgs} args - Arguments to create many OrderItemToppings.
     * @example
     * // Create many OrderItemToppings
     * const orderItemTopping = await prisma.orderItemTopping.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItemToppings and only return the `id`
     * const orderItemToppingWithIdOnly = await prisma.orderItemTopping.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemToppingCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemToppingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItemTopping.
     * @param {OrderItemToppingDeleteArgs} args - Arguments to delete one OrderItemTopping.
     * @example
     * // Delete one OrderItemTopping
     * const OrderItemTopping = await prisma.orderItemTopping.delete({
     *   where: {
     *     // ... filter to delete one OrderItemTopping
     *   }
     * })
     * 
     */
    delete<T extends OrderItemToppingDeleteArgs>(args: SelectSubset<T, OrderItemToppingDeleteArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItemTopping.
     * @param {OrderItemToppingUpdateArgs} args - Arguments to update one OrderItemTopping.
     * @example
     * // Update one OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemToppingUpdateArgs>(args: SelectSubset<T, OrderItemToppingUpdateArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItemToppings.
     * @param {OrderItemToppingDeleteManyArgs} args - Arguments to filter OrderItemToppings to delete.
     * @example
     * // Delete a few OrderItemToppings
     * const { count } = await prisma.orderItemTopping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemToppingDeleteManyArgs>(args?: SelectSubset<T, OrderItemToppingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItemToppings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItemToppings
     * const orderItemTopping = await prisma.orderItemTopping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemToppingUpdateManyArgs>(args: SelectSubset<T, OrderItemToppingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItemToppings and returns the data updated in the database.
     * @param {OrderItemToppingUpdateManyAndReturnArgs} args - Arguments to update many OrderItemToppings.
     * @example
     * // Update many OrderItemToppings
     * const orderItemTopping = await prisma.orderItemTopping.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItemToppings and only return the `id`
     * const orderItemToppingWithIdOnly = await prisma.orderItemTopping.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemToppingUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemToppingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItemTopping.
     * @param {OrderItemToppingUpsertArgs} args - Arguments to update or create a OrderItemTopping.
     * @example
     * // Update or create a OrderItemTopping
     * const orderItemTopping = await prisma.orderItemTopping.upsert({
     *   create: {
     *     // ... data to create a OrderItemTopping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItemTopping we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemToppingUpsertArgs>(args: SelectSubset<T, OrderItemToppingUpsertArgs<ExtArgs>>): Prisma__OrderItemToppingClient<$Result.GetResult<Prisma.$OrderItemToppingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItemToppings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingCountArgs} args - Arguments to filter OrderItemToppings to count.
     * @example
     * // Count the number of OrderItemToppings
     * const count = await prisma.orderItemTopping.count({
     *   where: {
     *     // ... the filter for the OrderItemToppings we want to count
     *   }
     * })
    **/
    count<T extends OrderItemToppingCountArgs>(
      args?: Subset<T, OrderItemToppingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemToppingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItemTopping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemToppingAggregateArgs>(args: Subset<T, OrderItemToppingAggregateArgs>): Prisma.PrismaPromise<GetOrderItemToppingAggregateType<T>>

    /**
     * Group by OrderItemTopping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemToppingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemToppingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemToppingGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemToppingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemToppingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemToppingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItemTopping model
   */
  readonly fields: OrderItemToppingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItemTopping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemToppingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order_item<T extends OrderItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderItemDefaultArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topping<T extends ToppingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ToppingDefaultArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItemTopping model
   */
  interface OrderItemToppingFieldRefs {
    readonly id: FieldRef<"OrderItemTopping", 'String'>
    readonly order_item_id: FieldRef<"OrderItemTopping", 'String'>
    readonly topping_id: FieldRef<"OrderItemTopping", 'String'>
    readonly name: FieldRef<"OrderItemTopping", 'String'>
    readonly price: FieldRef<"OrderItemTopping", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderItemTopping findUnique
   */
  export type OrderItemToppingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter, which OrderItemTopping to fetch.
     */
    where: OrderItemToppingWhereUniqueInput
  }

  /**
   * OrderItemTopping findUniqueOrThrow
   */
  export type OrderItemToppingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter, which OrderItemTopping to fetch.
     */
    where: OrderItemToppingWhereUniqueInput
  }

  /**
   * OrderItemTopping findFirst
   */
  export type OrderItemToppingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter, which OrderItemTopping to fetch.
     */
    where?: OrderItemToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItemToppings to fetch.
     */
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItemToppings.
     */
    cursor?: OrderItemToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItemToppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItemToppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItemToppings.
     */
    distinct?: OrderItemToppingScalarFieldEnum | OrderItemToppingScalarFieldEnum[]
  }

  /**
   * OrderItemTopping findFirstOrThrow
   */
  export type OrderItemToppingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter, which OrderItemTopping to fetch.
     */
    where?: OrderItemToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItemToppings to fetch.
     */
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItemToppings.
     */
    cursor?: OrderItemToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItemToppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItemToppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItemToppings.
     */
    distinct?: OrderItemToppingScalarFieldEnum | OrderItemToppingScalarFieldEnum[]
  }

  /**
   * OrderItemTopping findMany
   */
  export type OrderItemToppingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter, which OrderItemToppings to fetch.
     */
    where?: OrderItemToppingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItemToppings to fetch.
     */
    orderBy?: OrderItemToppingOrderByWithRelationInput | OrderItemToppingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItemToppings.
     */
    cursor?: OrderItemToppingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItemToppings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItemToppings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItemToppings.
     */
    distinct?: OrderItemToppingScalarFieldEnum | OrderItemToppingScalarFieldEnum[]
  }

  /**
   * OrderItemTopping create
   */
  export type OrderItemToppingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItemTopping.
     */
    data: XOR<OrderItemToppingCreateInput, OrderItemToppingUncheckedCreateInput>
  }

  /**
   * OrderItemTopping createMany
   */
  export type OrderItemToppingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItemToppings.
     */
    data: OrderItemToppingCreateManyInput | OrderItemToppingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItemTopping createManyAndReturn
   */
  export type OrderItemToppingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItemToppings.
     */
    data: OrderItemToppingCreateManyInput | OrderItemToppingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItemTopping update
   */
  export type OrderItemToppingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItemTopping.
     */
    data: XOR<OrderItemToppingUpdateInput, OrderItemToppingUncheckedUpdateInput>
    /**
     * Choose, which OrderItemTopping to update.
     */
    where: OrderItemToppingWhereUniqueInput
  }

  /**
   * OrderItemTopping updateMany
   */
  export type OrderItemToppingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItemToppings.
     */
    data: XOR<OrderItemToppingUpdateManyMutationInput, OrderItemToppingUncheckedUpdateManyInput>
    /**
     * Filter which OrderItemToppings to update
     */
    where?: OrderItemToppingWhereInput
    /**
     * Limit how many OrderItemToppings to update.
     */
    limit?: number
  }

  /**
   * OrderItemTopping updateManyAndReturn
   */
  export type OrderItemToppingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * The data used to update OrderItemToppings.
     */
    data: XOR<OrderItemToppingUpdateManyMutationInput, OrderItemToppingUncheckedUpdateManyInput>
    /**
     * Filter which OrderItemToppings to update
     */
    where?: OrderItemToppingWhereInput
    /**
     * Limit how many OrderItemToppings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItemTopping upsert
   */
  export type OrderItemToppingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItemTopping to update in case it exists.
     */
    where: OrderItemToppingWhereUniqueInput
    /**
     * In case the OrderItemTopping found by the `where` argument doesn't exist, create a new OrderItemTopping with this data.
     */
    create: XOR<OrderItemToppingCreateInput, OrderItemToppingUncheckedCreateInput>
    /**
     * In case the OrderItemTopping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemToppingUpdateInput, OrderItemToppingUncheckedUpdateInput>
  }

  /**
   * OrderItemTopping delete
   */
  export type OrderItemToppingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
    /**
     * Filter which OrderItemTopping to delete.
     */
    where: OrderItemToppingWhereUniqueInput
  }

  /**
   * OrderItemTopping deleteMany
   */
  export type OrderItemToppingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItemToppings to delete
     */
    where?: OrderItemToppingWhereInput
    /**
     * Limit how many OrderItemToppings to delete.
     */
    limit?: number
  }

  /**
   * OrderItemTopping without action
   */
  export type OrderItemToppingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemTopping
     */
    select?: OrderItemToppingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItemTopping
     */
    omit?: OrderItemToppingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemToppingInclude<ExtArgs> | null
  }


  /**
   * Model Material
   */

  export type AggregateMaterial = {
    _count: MaterialCountAggregateOutputType | null
    _avg: MaterialAvgAggregateOutputType | null
    _sum: MaterialSumAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  export type MaterialAvgAggregateOutputType = {
    cost_per_unit: number | null
    stock_current: number | null
  }

  export type MaterialSumAggregateOutputType = {
    cost_per_unit: number | null
    stock_current: number | null
  }

  export type MaterialMinAggregateOutputType = {
    id: string | null
    branch_id: string | null
    name: string | null
    unit: string | null
    cost_per_unit: number | null
    stock_current: number | null
  }

  export type MaterialMaxAggregateOutputType = {
    id: string | null
    branch_id: string | null
    name: string | null
    unit: string | null
    cost_per_unit: number | null
    stock_current: number | null
  }

  export type MaterialCountAggregateOutputType = {
    id: number
    branch_id: number
    name: number
    unit: number
    cost_per_unit: number
    stock_current: number
    _all: number
  }


  export type MaterialAvgAggregateInputType = {
    cost_per_unit?: true
    stock_current?: true
  }

  export type MaterialSumAggregateInputType = {
    cost_per_unit?: true
    stock_current?: true
  }

  export type MaterialMinAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    unit?: true
    cost_per_unit?: true
    stock_current?: true
  }

  export type MaterialMaxAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    unit?: true
    cost_per_unit?: true
    stock_current?: true
  }

  export type MaterialCountAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    unit?: true
    cost_per_unit?: true
    stock_current?: true
    _all?: true
  }

  export type MaterialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Material to aggregate.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Materials
    **/
    _count?: true | MaterialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialMaxAggregateInputType
  }

  export type GetMaterialAggregateType<T extends MaterialAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterial[P]>
      : GetScalarType<T[P], AggregateMaterial[P]>
  }




  export type MaterialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialWhereInput
    orderBy?: MaterialOrderByWithAggregationInput | MaterialOrderByWithAggregationInput[]
    by: MaterialScalarFieldEnum[] | MaterialScalarFieldEnum
    having?: MaterialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialCountAggregateInputType | true
    _avg?: MaterialAvgAggregateInputType
    _sum?: MaterialSumAggregateInputType
    _min?: MaterialMinAggregateInputType
    _max?: MaterialMaxAggregateInputType
  }

  export type MaterialGroupByOutputType = {
    id: string
    branch_id: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current: number
    _count: MaterialCountAggregateOutputType | null
    _avg: MaterialAvgAggregateOutputType | null
    _sum: MaterialSumAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  type GetMaterialGroupByPayload<T extends MaterialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialGroupByOutputType[P]>
        }
      >
    >


  export type MaterialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    unit?: boolean
    cost_per_unit?: boolean
    stock_current?: boolean
    transactions?: boolean | Material$transactionsArgs<ExtArgs>
    branch?: boolean | Material$branchArgs<ExtArgs>
    product_recipes?: boolean | Material$product_recipesArgs<ExtArgs>
    topping_recipes?: boolean | Material$topping_recipesArgs<ExtArgs>
    _count?: boolean | MaterialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    unit?: boolean
    cost_per_unit?: boolean
    stock_current?: boolean
    branch?: boolean | Material$branchArgs<ExtArgs>
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    unit?: boolean
    cost_per_unit?: boolean
    stock_current?: boolean
    branch?: boolean | Material$branchArgs<ExtArgs>
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectScalar = {
    id?: boolean
    branch_id?: boolean
    name?: boolean
    unit?: boolean
    cost_per_unit?: boolean
    stock_current?: boolean
  }

  export type MaterialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "branch_id" | "name" | "unit" | "cost_per_unit" | "stock_current", ExtArgs["result"]["material"]>
  export type MaterialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | Material$transactionsArgs<ExtArgs>
    branch?: boolean | Material$branchArgs<ExtArgs>
    product_recipes?: boolean | Material$product_recipesArgs<ExtArgs>
    topping_recipes?: boolean | Material$topping_recipesArgs<ExtArgs>
    _count?: boolean | MaterialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MaterialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Material$branchArgs<ExtArgs>
  }
  export type MaterialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Material$branchArgs<ExtArgs>
  }

  export type $MaterialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Material"
    objects: {
      transactions: Prisma.$MaterialTransactionPayload<ExtArgs>[]
      branch: Prisma.$BranchPayload<ExtArgs> | null
      product_recipes: Prisma.$ProductRecipePayload<ExtArgs>[]
      topping_recipes: Prisma.$ToppingRecipePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      branch_id: string | null
      name: string
      unit: string
      cost_per_unit: number
      stock_current: number
    }, ExtArgs["result"]["material"]>
    composites: {}
  }

  type MaterialGetPayload<S extends boolean | null | undefined | MaterialDefaultArgs> = $Result.GetResult<Prisma.$MaterialPayload, S>

  type MaterialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialCountAggregateInputType | true
    }

  export interface MaterialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Material'], meta: { name: 'Material' } }
    /**
     * Find zero or one Material that matches the filter.
     * @param {MaterialFindUniqueArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialFindUniqueArgs>(args: SelectSubset<T, MaterialFindUniqueArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Material that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialFindUniqueOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialFindFirstArgs>(args?: SelectSubset<T, MaterialFindFirstArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materials
     * const materials = await prisma.material.findMany()
     * 
     * // Get first 10 Materials
     * const materials = await prisma.material.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialWithIdOnly = await prisma.material.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialFindManyArgs>(args?: SelectSubset<T, MaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Material.
     * @param {MaterialCreateArgs} args - Arguments to create a Material.
     * @example
     * // Create one Material
     * const Material = await prisma.material.create({
     *   data: {
     *     // ... data to create a Material
     *   }
     * })
     * 
     */
    create<T extends MaterialCreateArgs>(args: SelectSubset<T, MaterialCreateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Materials.
     * @param {MaterialCreateManyArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialCreateManyArgs>(args?: SelectSubset<T, MaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Materials and returns the data saved in the database.
     * @param {MaterialCreateManyAndReturnArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Material.
     * @param {MaterialDeleteArgs} args - Arguments to delete one Material.
     * @example
     * // Delete one Material
     * const Material = await prisma.material.delete({
     *   where: {
     *     // ... filter to delete one Material
     *   }
     * })
     * 
     */
    delete<T extends MaterialDeleteArgs>(args: SelectSubset<T, MaterialDeleteArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Material.
     * @param {MaterialUpdateArgs} args - Arguments to update one Material.
     * @example
     * // Update one Material
     * const material = await prisma.material.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialUpdateArgs>(args: SelectSubset<T, MaterialUpdateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Materials.
     * @param {MaterialDeleteManyArgs} args - Arguments to filter Materials to delete.
     * @example
     * // Delete a few Materials
     * const { count } = await prisma.material.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialDeleteManyArgs>(args?: SelectSubset<T, MaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialUpdateManyArgs>(args: SelectSubset<T, MaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials and returns the data updated in the database.
     * @param {MaterialUpdateManyAndReturnArgs} args - Arguments to update many Materials.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Material.
     * @param {MaterialUpsertArgs} args - Arguments to update or create a Material.
     * @example
     * // Update or create a Material
     * const material = await prisma.material.upsert({
     *   create: {
     *     // ... data to create a Material
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Material we want to update
     *   }
     * })
     */
    upsert<T extends MaterialUpsertArgs>(args: SelectSubset<T, MaterialUpsertArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCountArgs} args - Arguments to filter Materials to count.
     * @example
     * // Count the number of Materials
     * const count = await prisma.material.count({
     *   where: {
     *     // ... the filter for the Materials we want to count
     *   }
     * })
    **/
    count<T extends MaterialCountArgs>(
      args?: Subset<T, MaterialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaterialAggregateArgs>(args: Subset<T, MaterialAggregateArgs>): Prisma.PrismaPromise<GetMaterialAggregateType<T>>

    /**
     * Group by Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaterialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialGroupByArgs['orderBy'] }
        : { orderBy?: MaterialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Material model
   */
  readonly fields: MaterialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Material.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends Material$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Material$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branch<T extends Material$branchArgs<ExtArgs> = {}>(args?: Subset<T, Material$branchArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    product_recipes<T extends Material$product_recipesArgs<ExtArgs> = {}>(args?: Subset<T, Material$product_recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    topping_recipes<T extends Material$topping_recipesArgs<ExtArgs> = {}>(args?: Subset<T, Material$topping_recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Material model
   */
  interface MaterialFieldRefs {
    readonly id: FieldRef<"Material", 'String'>
    readonly branch_id: FieldRef<"Material", 'String'>
    readonly name: FieldRef<"Material", 'String'>
    readonly unit: FieldRef<"Material", 'String'>
    readonly cost_per_unit: FieldRef<"Material", 'Float'>
    readonly stock_current: FieldRef<"Material", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Material findUnique
   */
  export type MaterialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findUniqueOrThrow
   */
  export type MaterialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findFirst
   */
  export type MaterialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findFirstOrThrow
   */
  export type MaterialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findMany
   */
  export type MaterialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter, which Materials to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material create
   */
  export type MaterialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The data needed to create a Material.
     */
    data: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
  }

  /**
   * Material createMany
   */
  export type MaterialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Materials.
     */
    data: MaterialCreateManyInput | MaterialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Material createManyAndReturn
   */
  export type MaterialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data used to create many Materials.
     */
    data: MaterialCreateManyInput | MaterialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Material update
   */
  export type MaterialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The data needed to update a Material.
     */
    data: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
    /**
     * Choose, which Material to update.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material updateMany
   */
  export type MaterialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Materials.
     */
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyInput>
    /**
     * Filter which Materials to update
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to update.
     */
    limit?: number
  }

  /**
   * Material updateManyAndReturn
   */
  export type MaterialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data used to update Materials.
     */
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyInput>
    /**
     * Filter which Materials to update
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Material upsert
   */
  export type MaterialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * The filter to search for the Material to update in case it exists.
     */
    where: MaterialWhereUniqueInput
    /**
     * In case the Material found by the `where` argument doesn't exist, create a new Material with this data.
     */
    create: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
    /**
     * In case the Material was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
  }

  /**
   * Material delete
   */
  export type MaterialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
    /**
     * Filter which Material to delete.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material deleteMany
   */
  export type MaterialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Materials to delete
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to delete.
     */
    limit?: number
  }

  /**
   * Material.transactions
   */
  export type Material$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    where?: MaterialTransactionWhereInput
    orderBy?: MaterialTransactionOrderByWithRelationInput | MaterialTransactionOrderByWithRelationInput[]
    cursor?: MaterialTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaterialTransactionScalarFieldEnum | MaterialTransactionScalarFieldEnum[]
  }

  /**
   * Material.branch
   */
  export type Material$branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
  }

  /**
   * Material.product_recipes
   */
  export type Material$product_recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    where?: ProductRecipeWhereInput
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    cursor?: ProductRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductRecipeScalarFieldEnum | ProductRecipeScalarFieldEnum[]
  }

  /**
   * Material.topping_recipes
   */
  export type Material$topping_recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    where?: ToppingRecipeWhereInput
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    cursor?: ToppingRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ToppingRecipeScalarFieldEnum | ToppingRecipeScalarFieldEnum[]
  }

  /**
   * Material without action
   */
  export type MaterialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialInclude<ExtArgs> | null
  }


  /**
   * Model MaterialTransaction
   */

  export type AggregateMaterialTransaction = {
    _count: MaterialTransactionCountAggregateOutputType | null
    _avg: MaterialTransactionAvgAggregateOutputType | null
    _sum: MaterialTransactionSumAggregateOutputType | null
    _min: MaterialTransactionMinAggregateOutputType | null
    _max: MaterialTransactionMaxAggregateOutputType | null
  }

  export type MaterialTransactionAvgAggregateOutputType = {
    quantity: number | null
  }

  export type MaterialTransactionSumAggregateOutputType = {
    quantity: number | null
  }

  export type MaterialTransactionMinAggregateOutputType = {
    id: string | null
    material_id: string | null
    type: string | null
    quantity: number | null
    note: string | null
    created_at: Date | null
  }

  export type MaterialTransactionMaxAggregateOutputType = {
    id: string | null
    material_id: string | null
    type: string | null
    quantity: number | null
    note: string | null
    created_at: Date | null
  }

  export type MaterialTransactionCountAggregateOutputType = {
    id: number
    material_id: number
    type: number
    quantity: number
    note: number
    created_at: number
    _all: number
  }


  export type MaterialTransactionAvgAggregateInputType = {
    quantity?: true
  }

  export type MaterialTransactionSumAggregateInputType = {
    quantity?: true
  }

  export type MaterialTransactionMinAggregateInputType = {
    id?: true
    material_id?: true
    type?: true
    quantity?: true
    note?: true
    created_at?: true
  }

  export type MaterialTransactionMaxAggregateInputType = {
    id?: true
    material_id?: true
    type?: true
    quantity?: true
    note?: true
    created_at?: true
  }

  export type MaterialTransactionCountAggregateInputType = {
    id?: true
    material_id?: true
    type?: true
    quantity?: true
    note?: true
    created_at?: true
    _all?: true
  }

  export type MaterialTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialTransaction to aggregate.
     */
    where?: MaterialTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTransactions to fetch.
     */
    orderBy?: MaterialTransactionOrderByWithRelationInput | MaterialTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaterialTransactions
    **/
    _count?: true | MaterialTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaterialTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaterialTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialTransactionMaxAggregateInputType
  }

  export type GetMaterialTransactionAggregateType<T extends MaterialTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterialTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterialTransaction[P]>
      : GetScalarType<T[P], AggregateMaterialTransaction[P]>
  }




  export type MaterialTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialTransactionWhereInput
    orderBy?: MaterialTransactionOrderByWithAggregationInput | MaterialTransactionOrderByWithAggregationInput[]
    by: MaterialTransactionScalarFieldEnum[] | MaterialTransactionScalarFieldEnum
    having?: MaterialTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialTransactionCountAggregateInputType | true
    _avg?: MaterialTransactionAvgAggregateInputType
    _sum?: MaterialTransactionSumAggregateInputType
    _min?: MaterialTransactionMinAggregateInputType
    _max?: MaterialTransactionMaxAggregateInputType
  }

  export type MaterialTransactionGroupByOutputType = {
    id: string
    material_id: string
    type: string
    quantity: number
    note: string | null
    created_at: Date
    _count: MaterialTransactionCountAggregateOutputType | null
    _avg: MaterialTransactionAvgAggregateOutputType | null
    _sum: MaterialTransactionSumAggregateOutputType | null
    _min: MaterialTransactionMinAggregateOutputType | null
    _max: MaterialTransactionMaxAggregateOutputType | null
  }

  type GetMaterialTransactionGroupByPayload<T extends MaterialTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialTransactionGroupByOutputType[P]>
        }
      >
    >


  export type MaterialTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    material_id?: boolean
    type?: boolean
    quantity?: boolean
    note?: boolean
    created_at?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialTransaction"]>

  export type MaterialTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    material_id?: boolean
    type?: boolean
    quantity?: boolean
    note?: boolean
    created_at?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialTransaction"]>

  export type MaterialTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    material_id?: boolean
    type?: boolean
    quantity?: boolean
    note?: boolean
    created_at?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["materialTransaction"]>

  export type MaterialTransactionSelectScalar = {
    id?: boolean
    material_id?: boolean
    type?: boolean
    quantity?: boolean
    note?: boolean
    created_at?: boolean
  }

  export type MaterialTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "material_id" | "type" | "quantity" | "note" | "created_at", ExtArgs["result"]["materialTransaction"]>
  export type MaterialTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }
  export type MaterialTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }
  export type MaterialTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
  }

  export type $MaterialTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaterialTransaction"
    objects: {
      material: Prisma.$MaterialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      material_id: string
      type: string
      quantity: number
      note: string | null
      created_at: Date
    }, ExtArgs["result"]["materialTransaction"]>
    composites: {}
  }

  type MaterialTransactionGetPayload<S extends boolean | null | undefined | MaterialTransactionDefaultArgs> = $Result.GetResult<Prisma.$MaterialTransactionPayload, S>

  type MaterialTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialTransactionCountAggregateInputType | true
    }

  export interface MaterialTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaterialTransaction'], meta: { name: 'MaterialTransaction' } }
    /**
     * Find zero or one MaterialTransaction that matches the filter.
     * @param {MaterialTransactionFindUniqueArgs} args - Arguments to find a MaterialTransaction
     * @example
     * // Get one MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialTransactionFindUniqueArgs>(args: SelectSubset<T, MaterialTransactionFindUniqueArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaterialTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialTransactionFindUniqueOrThrowArgs} args - Arguments to find a MaterialTransaction
     * @example
     * // Get one MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionFindFirstArgs} args - Arguments to find a MaterialTransaction
     * @example
     * // Get one MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialTransactionFindFirstArgs>(args?: SelectSubset<T, MaterialTransactionFindFirstArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaterialTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionFindFirstOrThrowArgs} args - Arguments to find a MaterialTransaction
     * @example
     * // Get one MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaterialTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaterialTransactions
     * const materialTransactions = await prisma.materialTransaction.findMany()
     * 
     * // Get first 10 MaterialTransactions
     * const materialTransactions = await prisma.materialTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialTransactionWithIdOnly = await prisma.materialTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialTransactionFindManyArgs>(args?: SelectSubset<T, MaterialTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaterialTransaction.
     * @param {MaterialTransactionCreateArgs} args - Arguments to create a MaterialTransaction.
     * @example
     * // Create one MaterialTransaction
     * const MaterialTransaction = await prisma.materialTransaction.create({
     *   data: {
     *     // ... data to create a MaterialTransaction
     *   }
     * })
     * 
     */
    create<T extends MaterialTransactionCreateArgs>(args: SelectSubset<T, MaterialTransactionCreateArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaterialTransactions.
     * @param {MaterialTransactionCreateManyArgs} args - Arguments to create many MaterialTransactions.
     * @example
     * // Create many MaterialTransactions
     * const materialTransaction = await prisma.materialTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialTransactionCreateManyArgs>(args?: SelectSubset<T, MaterialTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaterialTransactions and returns the data saved in the database.
     * @param {MaterialTransactionCreateManyAndReturnArgs} args - Arguments to create many MaterialTransactions.
     * @example
     * // Create many MaterialTransactions
     * const materialTransaction = await prisma.materialTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaterialTransactions and only return the `id`
     * const materialTransactionWithIdOnly = await prisma.materialTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaterialTransaction.
     * @param {MaterialTransactionDeleteArgs} args - Arguments to delete one MaterialTransaction.
     * @example
     * // Delete one MaterialTransaction
     * const MaterialTransaction = await prisma.materialTransaction.delete({
     *   where: {
     *     // ... filter to delete one MaterialTransaction
     *   }
     * })
     * 
     */
    delete<T extends MaterialTransactionDeleteArgs>(args: SelectSubset<T, MaterialTransactionDeleteArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaterialTransaction.
     * @param {MaterialTransactionUpdateArgs} args - Arguments to update one MaterialTransaction.
     * @example
     * // Update one MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialTransactionUpdateArgs>(args: SelectSubset<T, MaterialTransactionUpdateArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaterialTransactions.
     * @param {MaterialTransactionDeleteManyArgs} args - Arguments to filter MaterialTransactions to delete.
     * @example
     * // Delete a few MaterialTransactions
     * const { count } = await prisma.materialTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialTransactionDeleteManyArgs>(args?: SelectSubset<T, MaterialTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaterialTransactions
     * const materialTransaction = await prisma.materialTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialTransactionUpdateManyArgs>(args: SelectSubset<T, MaterialTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaterialTransactions and returns the data updated in the database.
     * @param {MaterialTransactionUpdateManyAndReturnArgs} args - Arguments to update many MaterialTransactions.
     * @example
     * // Update many MaterialTransactions
     * const materialTransaction = await prisma.materialTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaterialTransactions and only return the `id`
     * const materialTransactionWithIdOnly = await prisma.materialTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaterialTransaction.
     * @param {MaterialTransactionUpsertArgs} args - Arguments to update or create a MaterialTransaction.
     * @example
     * // Update or create a MaterialTransaction
     * const materialTransaction = await prisma.materialTransaction.upsert({
     *   create: {
     *     // ... data to create a MaterialTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaterialTransaction we want to update
     *   }
     * })
     */
    upsert<T extends MaterialTransactionUpsertArgs>(args: SelectSubset<T, MaterialTransactionUpsertArgs<ExtArgs>>): Prisma__MaterialTransactionClient<$Result.GetResult<Prisma.$MaterialTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaterialTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionCountArgs} args - Arguments to filter MaterialTransactions to count.
     * @example
     * // Count the number of MaterialTransactions
     * const count = await prisma.materialTransaction.count({
     *   where: {
     *     // ... the filter for the MaterialTransactions we want to count
     *   }
     * })
    **/
    count<T extends MaterialTransactionCountArgs>(
      args?: Subset<T, MaterialTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaterialTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaterialTransactionAggregateArgs>(args: Subset<T, MaterialTransactionAggregateArgs>): Prisma.PrismaPromise<GetMaterialTransactionAggregateType<T>>

    /**
     * Group by MaterialTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaterialTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialTransactionGroupByArgs['orderBy'] }
        : { orderBy?: MaterialTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaterialTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaterialTransaction model
   */
  readonly fields: MaterialTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaterialTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    material<T extends MaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialDefaultArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaterialTransaction model
   */
  interface MaterialTransactionFieldRefs {
    readonly id: FieldRef<"MaterialTransaction", 'String'>
    readonly material_id: FieldRef<"MaterialTransaction", 'String'>
    readonly type: FieldRef<"MaterialTransaction", 'String'>
    readonly quantity: FieldRef<"MaterialTransaction", 'Float'>
    readonly note: FieldRef<"MaterialTransaction", 'String'>
    readonly created_at: FieldRef<"MaterialTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaterialTransaction findUnique
   */
  export type MaterialTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTransaction to fetch.
     */
    where: MaterialTransactionWhereUniqueInput
  }

  /**
   * MaterialTransaction findUniqueOrThrow
   */
  export type MaterialTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTransaction to fetch.
     */
    where: MaterialTransactionWhereUniqueInput
  }

  /**
   * MaterialTransaction findFirst
   */
  export type MaterialTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTransaction to fetch.
     */
    where?: MaterialTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTransactions to fetch.
     */
    orderBy?: MaterialTransactionOrderByWithRelationInput | MaterialTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialTransactions.
     */
    cursor?: MaterialTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialTransactions.
     */
    distinct?: MaterialTransactionScalarFieldEnum | MaterialTransactionScalarFieldEnum[]
  }

  /**
   * MaterialTransaction findFirstOrThrow
   */
  export type MaterialTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTransaction to fetch.
     */
    where?: MaterialTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTransactions to fetch.
     */
    orderBy?: MaterialTransactionOrderByWithRelationInput | MaterialTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaterialTransactions.
     */
    cursor?: MaterialTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialTransactions.
     */
    distinct?: MaterialTransactionScalarFieldEnum | MaterialTransactionScalarFieldEnum[]
  }

  /**
   * MaterialTransaction findMany
   */
  export type MaterialTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MaterialTransactions to fetch.
     */
    where?: MaterialTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaterialTransactions to fetch.
     */
    orderBy?: MaterialTransactionOrderByWithRelationInput | MaterialTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaterialTransactions.
     */
    cursor?: MaterialTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaterialTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaterialTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaterialTransactions.
     */
    distinct?: MaterialTransactionScalarFieldEnum | MaterialTransactionScalarFieldEnum[]
  }

  /**
   * MaterialTransaction create
   */
  export type MaterialTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a MaterialTransaction.
     */
    data: XOR<MaterialTransactionCreateInput, MaterialTransactionUncheckedCreateInput>
  }

  /**
   * MaterialTransaction createMany
   */
  export type MaterialTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaterialTransactions.
     */
    data: MaterialTransactionCreateManyInput | MaterialTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaterialTransaction createManyAndReturn
   */
  export type MaterialTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many MaterialTransactions.
     */
    data: MaterialTransactionCreateManyInput | MaterialTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialTransaction update
   */
  export type MaterialTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a MaterialTransaction.
     */
    data: XOR<MaterialTransactionUpdateInput, MaterialTransactionUncheckedUpdateInput>
    /**
     * Choose, which MaterialTransaction to update.
     */
    where: MaterialTransactionWhereUniqueInput
  }

  /**
   * MaterialTransaction updateMany
   */
  export type MaterialTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaterialTransactions.
     */
    data: XOR<MaterialTransactionUpdateManyMutationInput, MaterialTransactionUncheckedUpdateManyInput>
    /**
     * Filter which MaterialTransactions to update
     */
    where?: MaterialTransactionWhereInput
    /**
     * Limit how many MaterialTransactions to update.
     */
    limit?: number
  }

  /**
   * MaterialTransaction updateManyAndReturn
   */
  export type MaterialTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * The data used to update MaterialTransactions.
     */
    data: XOR<MaterialTransactionUpdateManyMutationInput, MaterialTransactionUncheckedUpdateManyInput>
    /**
     * Filter which MaterialTransactions to update
     */
    where?: MaterialTransactionWhereInput
    /**
     * Limit how many MaterialTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaterialTransaction upsert
   */
  export type MaterialTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the MaterialTransaction to update in case it exists.
     */
    where: MaterialTransactionWhereUniqueInput
    /**
     * In case the MaterialTransaction found by the `where` argument doesn't exist, create a new MaterialTransaction with this data.
     */
    create: XOR<MaterialTransactionCreateInput, MaterialTransactionUncheckedCreateInput>
    /**
     * In case the MaterialTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialTransactionUpdateInput, MaterialTransactionUncheckedUpdateInput>
  }

  /**
   * MaterialTransaction delete
   */
  export type MaterialTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
    /**
     * Filter which MaterialTransaction to delete.
     */
    where: MaterialTransactionWhereUniqueInput
  }

  /**
   * MaterialTransaction deleteMany
   */
  export type MaterialTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaterialTransactions to delete
     */
    where?: MaterialTransactionWhereInput
    /**
     * Limit how many MaterialTransactions to delete.
     */
    limit?: number
  }

  /**
   * MaterialTransaction without action
   */
  export type MaterialTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialTransaction
     */
    select?: MaterialTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaterialTransaction
     */
    omit?: MaterialTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaterialTransactionInclude<ExtArgs> | null
  }


  /**
   * Model ProductRecipe
   */

  export type AggregateProductRecipe = {
    _count: ProductRecipeCountAggregateOutputType | null
    _avg: ProductRecipeAvgAggregateOutputType | null
    _sum: ProductRecipeSumAggregateOutputType | null
    _min: ProductRecipeMinAggregateOutputType | null
    _max: ProductRecipeMaxAggregateOutputType | null
  }

  export type ProductRecipeAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ProductRecipeSumAggregateOutputType = {
    quantity: number | null
  }

  export type ProductRecipeMinAggregateOutputType = {
    id: string | null
    variant_id: string | null
    material_id: string | null
    quantity: number | null
  }

  export type ProductRecipeMaxAggregateOutputType = {
    id: string | null
    variant_id: string | null
    material_id: string | null
    quantity: number | null
  }

  export type ProductRecipeCountAggregateOutputType = {
    id: number
    variant_id: number
    material_id: number
    quantity: number
    _all: number
  }


  export type ProductRecipeAvgAggregateInputType = {
    quantity?: true
  }

  export type ProductRecipeSumAggregateInputType = {
    quantity?: true
  }

  export type ProductRecipeMinAggregateInputType = {
    id?: true
    variant_id?: true
    material_id?: true
    quantity?: true
  }

  export type ProductRecipeMaxAggregateInputType = {
    id?: true
    variant_id?: true
    material_id?: true
    quantity?: true
  }

  export type ProductRecipeCountAggregateInputType = {
    id?: true
    variant_id?: true
    material_id?: true
    quantity?: true
    _all?: true
  }

  export type ProductRecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductRecipe to aggregate.
     */
    where?: ProductRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRecipes to fetch.
     */
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductRecipes
    **/
    _count?: true | ProductRecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductRecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductRecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductRecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductRecipeMaxAggregateInputType
  }

  export type GetProductRecipeAggregateType<T extends ProductRecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateProductRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductRecipe[P]>
      : GetScalarType<T[P], AggregateProductRecipe[P]>
  }




  export type ProductRecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductRecipeWhereInput
    orderBy?: ProductRecipeOrderByWithAggregationInput | ProductRecipeOrderByWithAggregationInput[]
    by: ProductRecipeScalarFieldEnum[] | ProductRecipeScalarFieldEnum
    having?: ProductRecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductRecipeCountAggregateInputType | true
    _avg?: ProductRecipeAvgAggregateInputType
    _sum?: ProductRecipeSumAggregateInputType
    _min?: ProductRecipeMinAggregateInputType
    _max?: ProductRecipeMaxAggregateInputType
  }

  export type ProductRecipeGroupByOutputType = {
    id: string
    variant_id: string
    material_id: string
    quantity: number
    _count: ProductRecipeCountAggregateOutputType | null
    _avg: ProductRecipeAvgAggregateOutputType | null
    _sum: ProductRecipeSumAggregateOutputType | null
    _min: ProductRecipeMinAggregateOutputType | null
    _max: ProductRecipeMaxAggregateOutputType | null
  }

  type GetProductRecipeGroupByPayload<T extends ProductRecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductRecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductRecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductRecipeGroupByOutputType[P]>
            : GetScalarType<T[P], ProductRecipeGroupByOutputType[P]>
        }
      >
    >


  export type ProductRecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variant_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productRecipe"]>

  export type ProductRecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variant_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productRecipe"]>

  export type ProductRecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variant_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productRecipe"]>

  export type ProductRecipeSelectScalar = {
    id?: boolean
    variant_id?: boolean
    material_id?: boolean
    quantity?: boolean
  }

  export type ProductRecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "variant_id" | "material_id" | "quantity", ExtArgs["result"]["productRecipe"]>
  export type ProductRecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }
  export type ProductRecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }
  export type ProductRecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    variant?: boolean | ProductVariantDefaultArgs<ExtArgs>
  }

  export type $ProductRecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductRecipe"
    objects: {
      material: Prisma.$MaterialPayload<ExtArgs>
      variant: Prisma.$ProductVariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      variant_id: string
      material_id: string
      quantity: number
    }, ExtArgs["result"]["productRecipe"]>
    composites: {}
  }

  type ProductRecipeGetPayload<S extends boolean | null | undefined | ProductRecipeDefaultArgs> = $Result.GetResult<Prisma.$ProductRecipePayload, S>

  type ProductRecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductRecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductRecipeCountAggregateInputType | true
    }

  export interface ProductRecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductRecipe'], meta: { name: 'ProductRecipe' } }
    /**
     * Find zero or one ProductRecipe that matches the filter.
     * @param {ProductRecipeFindUniqueArgs} args - Arguments to find a ProductRecipe
     * @example
     * // Get one ProductRecipe
     * const productRecipe = await prisma.productRecipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductRecipeFindUniqueArgs>(args: SelectSubset<T, ProductRecipeFindUniqueArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductRecipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductRecipeFindUniqueOrThrowArgs} args - Arguments to find a ProductRecipe
     * @example
     * // Get one ProductRecipe
     * const productRecipe = await prisma.productRecipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductRecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductRecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductRecipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeFindFirstArgs} args - Arguments to find a ProductRecipe
     * @example
     * // Get one ProductRecipe
     * const productRecipe = await prisma.productRecipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductRecipeFindFirstArgs>(args?: SelectSubset<T, ProductRecipeFindFirstArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductRecipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeFindFirstOrThrowArgs} args - Arguments to find a ProductRecipe
     * @example
     * // Get one ProductRecipe
     * const productRecipe = await prisma.productRecipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductRecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductRecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductRecipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductRecipes
     * const productRecipes = await prisma.productRecipe.findMany()
     * 
     * // Get first 10 ProductRecipes
     * const productRecipes = await prisma.productRecipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productRecipeWithIdOnly = await prisma.productRecipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductRecipeFindManyArgs>(args?: SelectSubset<T, ProductRecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductRecipe.
     * @param {ProductRecipeCreateArgs} args - Arguments to create a ProductRecipe.
     * @example
     * // Create one ProductRecipe
     * const ProductRecipe = await prisma.productRecipe.create({
     *   data: {
     *     // ... data to create a ProductRecipe
     *   }
     * })
     * 
     */
    create<T extends ProductRecipeCreateArgs>(args: SelectSubset<T, ProductRecipeCreateArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductRecipes.
     * @param {ProductRecipeCreateManyArgs} args - Arguments to create many ProductRecipes.
     * @example
     * // Create many ProductRecipes
     * const productRecipe = await prisma.productRecipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductRecipeCreateManyArgs>(args?: SelectSubset<T, ProductRecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductRecipes and returns the data saved in the database.
     * @param {ProductRecipeCreateManyAndReturnArgs} args - Arguments to create many ProductRecipes.
     * @example
     * // Create many ProductRecipes
     * const productRecipe = await prisma.productRecipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductRecipes and only return the `id`
     * const productRecipeWithIdOnly = await prisma.productRecipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductRecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductRecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductRecipe.
     * @param {ProductRecipeDeleteArgs} args - Arguments to delete one ProductRecipe.
     * @example
     * // Delete one ProductRecipe
     * const ProductRecipe = await prisma.productRecipe.delete({
     *   where: {
     *     // ... filter to delete one ProductRecipe
     *   }
     * })
     * 
     */
    delete<T extends ProductRecipeDeleteArgs>(args: SelectSubset<T, ProductRecipeDeleteArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductRecipe.
     * @param {ProductRecipeUpdateArgs} args - Arguments to update one ProductRecipe.
     * @example
     * // Update one ProductRecipe
     * const productRecipe = await prisma.productRecipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductRecipeUpdateArgs>(args: SelectSubset<T, ProductRecipeUpdateArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductRecipes.
     * @param {ProductRecipeDeleteManyArgs} args - Arguments to filter ProductRecipes to delete.
     * @example
     * // Delete a few ProductRecipes
     * const { count } = await prisma.productRecipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductRecipeDeleteManyArgs>(args?: SelectSubset<T, ProductRecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductRecipes
     * const productRecipe = await prisma.productRecipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductRecipeUpdateManyArgs>(args: SelectSubset<T, ProductRecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductRecipes and returns the data updated in the database.
     * @param {ProductRecipeUpdateManyAndReturnArgs} args - Arguments to update many ProductRecipes.
     * @example
     * // Update many ProductRecipes
     * const productRecipe = await prisma.productRecipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductRecipes and only return the `id`
     * const productRecipeWithIdOnly = await prisma.productRecipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductRecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductRecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductRecipe.
     * @param {ProductRecipeUpsertArgs} args - Arguments to update or create a ProductRecipe.
     * @example
     * // Update or create a ProductRecipe
     * const productRecipe = await prisma.productRecipe.upsert({
     *   create: {
     *     // ... data to create a ProductRecipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductRecipe we want to update
     *   }
     * })
     */
    upsert<T extends ProductRecipeUpsertArgs>(args: SelectSubset<T, ProductRecipeUpsertArgs<ExtArgs>>): Prisma__ProductRecipeClient<$Result.GetResult<Prisma.$ProductRecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeCountArgs} args - Arguments to filter ProductRecipes to count.
     * @example
     * // Count the number of ProductRecipes
     * const count = await prisma.productRecipe.count({
     *   where: {
     *     // ... the filter for the ProductRecipes we want to count
     *   }
     * })
    **/
    count<T extends ProductRecipeCountArgs>(
      args?: Subset<T, ProductRecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductRecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductRecipeAggregateArgs>(args: Subset<T, ProductRecipeAggregateArgs>): Prisma.PrismaPromise<GetProductRecipeAggregateType<T>>

    /**
     * Group by ProductRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductRecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductRecipeGroupByArgs['orderBy'] }
        : { orderBy?: ProductRecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductRecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductRecipe model
   */
  readonly fields: ProductRecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductRecipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductRecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    material<T extends MaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialDefaultArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends ProductVariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariantDefaultArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductRecipe model
   */
  interface ProductRecipeFieldRefs {
    readonly id: FieldRef<"ProductRecipe", 'String'>
    readonly variant_id: FieldRef<"ProductRecipe", 'String'>
    readonly material_id: FieldRef<"ProductRecipe", 'String'>
    readonly quantity: FieldRef<"ProductRecipe", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * ProductRecipe findUnique
   */
  export type ProductRecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ProductRecipe to fetch.
     */
    where: ProductRecipeWhereUniqueInput
  }

  /**
   * ProductRecipe findUniqueOrThrow
   */
  export type ProductRecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ProductRecipe to fetch.
     */
    where: ProductRecipeWhereUniqueInput
  }

  /**
   * ProductRecipe findFirst
   */
  export type ProductRecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ProductRecipe to fetch.
     */
    where?: ProductRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRecipes to fetch.
     */
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductRecipes.
     */
    cursor?: ProductRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRecipes.
     */
    distinct?: ProductRecipeScalarFieldEnum | ProductRecipeScalarFieldEnum[]
  }

  /**
   * ProductRecipe findFirstOrThrow
   */
  export type ProductRecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ProductRecipe to fetch.
     */
    where?: ProductRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRecipes to fetch.
     */
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductRecipes.
     */
    cursor?: ProductRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRecipes.
     */
    distinct?: ProductRecipeScalarFieldEnum | ProductRecipeScalarFieldEnum[]
  }

  /**
   * ProductRecipe findMany
   */
  export type ProductRecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ProductRecipes to fetch.
     */
    where?: ProductRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRecipes to fetch.
     */
    orderBy?: ProductRecipeOrderByWithRelationInput | ProductRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductRecipes.
     */
    cursor?: ProductRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRecipes.
     */
    distinct?: ProductRecipeScalarFieldEnum | ProductRecipeScalarFieldEnum[]
  }

  /**
   * ProductRecipe create
   */
  export type ProductRecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductRecipe.
     */
    data: XOR<ProductRecipeCreateInput, ProductRecipeUncheckedCreateInput>
  }

  /**
   * ProductRecipe createMany
   */
  export type ProductRecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductRecipes.
     */
    data: ProductRecipeCreateManyInput | ProductRecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductRecipe createManyAndReturn
   */
  export type ProductRecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * The data used to create many ProductRecipes.
     */
    data: ProductRecipeCreateManyInput | ProductRecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductRecipe update
   */
  export type ProductRecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductRecipe.
     */
    data: XOR<ProductRecipeUpdateInput, ProductRecipeUncheckedUpdateInput>
    /**
     * Choose, which ProductRecipe to update.
     */
    where: ProductRecipeWhereUniqueInput
  }

  /**
   * ProductRecipe updateMany
   */
  export type ProductRecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductRecipes.
     */
    data: XOR<ProductRecipeUpdateManyMutationInput, ProductRecipeUncheckedUpdateManyInput>
    /**
     * Filter which ProductRecipes to update
     */
    where?: ProductRecipeWhereInput
    /**
     * Limit how many ProductRecipes to update.
     */
    limit?: number
  }

  /**
   * ProductRecipe updateManyAndReturn
   */
  export type ProductRecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * The data used to update ProductRecipes.
     */
    data: XOR<ProductRecipeUpdateManyMutationInput, ProductRecipeUncheckedUpdateManyInput>
    /**
     * Filter which ProductRecipes to update
     */
    where?: ProductRecipeWhereInput
    /**
     * Limit how many ProductRecipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductRecipe upsert
   */
  export type ProductRecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductRecipe to update in case it exists.
     */
    where: ProductRecipeWhereUniqueInput
    /**
     * In case the ProductRecipe found by the `where` argument doesn't exist, create a new ProductRecipe with this data.
     */
    create: XOR<ProductRecipeCreateInput, ProductRecipeUncheckedCreateInput>
    /**
     * In case the ProductRecipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductRecipeUpdateInput, ProductRecipeUncheckedUpdateInput>
  }

  /**
   * ProductRecipe delete
   */
  export type ProductRecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
    /**
     * Filter which ProductRecipe to delete.
     */
    where: ProductRecipeWhereUniqueInput
  }

  /**
   * ProductRecipe deleteMany
   */
  export type ProductRecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductRecipes to delete
     */
    where?: ProductRecipeWhereInput
    /**
     * Limit how many ProductRecipes to delete.
     */
    limit?: number
  }

  /**
   * ProductRecipe without action
   */
  export type ProductRecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRecipe
     */
    select?: ProductRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRecipe
     */
    omit?: ProductRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductRecipeInclude<ExtArgs> | null
  }


  /**
   * Model ToppingRecipe
   */

  export type AggregateToppingRecipe = {
    _count: ToppingRecipeCountAggregateOutputType | null
    _avg: ToppingRecipeAvgAggregateOutputType | null
    _sum: ToppingRecipeSumAggregateOutputType | null
    _min: ToppingRecipeMinAggregateOutputType | null
    _max: ToppingRecipeMaxAggregateOutputType | null
  }

  export type ToppingRecipeAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ToppingRecipeSumAggregateOutputType = {
    quantity: number | null
  }

  export type ToppingRecipeMinAggregateOutputType = {
    id: string | null
    topping_id: string | null
    material_id: string | null
    quantity: number | null
  }

  export type ToppingRecipeMaxAggregateOutputType = {
    id: string | null
    topping_id: string | null
    material_id: string | null
    quantity: number | null
  }

  export type ToppingRecipeCountAggregateOutputType = {
    id: number
    topping_id: number
    material_id: number
    quantity: number
    _all: number
  }


  export type ToppingRecipeAvgAggregateInputType = {
    quantity?: true
  }

  export type ToppingRecipeSumAggregateInputType = {
    quantity?: true
  }

  export type ToppingRecipeMinAggregateInputType = {
    id?: true
    topping_id?: true
    material_id?: true
    quantity?: true
  }

  export type ToppingRecipeMaxAggregateInputType = {
    id?: true
    topping_id?: true
    material_id?: true
    quantity?: true
  }

  export type ToppingRecipeCountAggregateInputType = {
    id?: true
    topping_id?: true
    material_id?: true
    quantity?: true
    _all?: true
  }

  export type ToppingRecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToppingRecipe to aggregate.
     */
    where?: ToppingRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToppingRecipes to fetch.
     */
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ToppingRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToppingRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToppingRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ToppingRecipes
    **/
    _count?: true | ToppingRecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ToppingRecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ToppingRecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ToppingRecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ToppingRecipeMaxAggregateInputType
  }

  export type GetToppingRecipeAggregateType<T extends ToppingRecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateToppingRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToppingRecipe[P]>
      : GetScalarType<T[P], AggregateToppingRecipe[P]>
  }




  export type ToppingRecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ToppingRecipeWhereInput
    orderBy?: ToppingRecipeOrderByWithAggregationInput | ToppingRecipeOrderByWithAggregationInput[]
    by: ToppingRecipeScalarFieldEnum[] | ToppingRecipeScalarFieldEnum
    having?: ToppingRecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ToppingRecipeCountAggregateInputType | true
    _avg?: ToppingRecipeAvgAggregateInputType
    _sum?: ToppingRecipeSumAggregateInputType
    _min?: ToppingRecipeMinAggregateInputType
    _max?: ToppingRecipeMaxAggregateInputType
  }

  export type ToppingRecipeGroupByOutputType = {
    id: string
    topping_id: string
    material_id: string
    quantity: number
    _count: ToppingRecipeCountAggregateOutputType | null
    _avg: ToppingRecipeAvgAggregateOutputType | null
    _sum: ToppingRecipeSumAggregateOutputType | null
    _min: ToppingRecipeMinAggregateOutputType | null
    _max: ToppingRecipeMaxAggregateOutputType | null
  }

  type GetToppingRecipeGroupByPayload<T extends ToppingRecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ToppingRecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ToppingRecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ToppingRecipeGroupByOutputType[P]>
            : GetScalarType<T[P], ToppingRecipeGroupByOutputType[P]>
        }
      >
    >


  export type ToppingRecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    topping_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toppingRecipe"]>

  export type ToppingRecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    topping_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toppingRecipe"]>

  export type ToppingRecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    topping_id?: boolean
    material_id?: boolean
    quantity?: boolean
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["toppingRecipe"]>

  export type ToppingRecipeSelectScalar = {
    id?: boolean
    topping_id?: boolean
    material_id?: boolean
    quantity?: boolean
  }

  export type ToppingRecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "topping_id" | "material_id" | "quantity", ExtArgs["result"]["toppingRecipe"]>
  export type ToppingRecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }
  export type ToppingRecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }
  export type ToppingRecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | MaterialDefaultArgs<ExtArgs>
    topping?: boolean | ToppingDefaultArgs<ExtArgs>
  }

  export type $ToppingRecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ToppingRecipe"
    objects: {
      material: Prisma.$MaterialPayload<ExtArgs>
      topping: Prisma.$ToppingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      topping_id: string
      material_id: string
      quantity: number
    }, ExtArgs["result"]["toppingRecipe"]>
    composites: {}
  }

  type ToppingRecipeGetPayload<S extends boolean | null | undefined | ToppingRecipeDefaultArgs> = $Result.GetResult<Prisma.$ToppingRecipePayload, S>

  type ToppingRecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ToppingRecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ToppingRecipeCountAggregateInputType | true
    }

  export interface ToppingRecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ToppingRecipe'], meta: { name: 'ToppingRecipe' } }
    /**
     * Find zero or one ToppingRecipe that matches the filter.
     * @param {ToppingRecipeFindUniqueArgs} args - Arguments to find a ToppingRecipe
     * @example
     * // Get one ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ToppingRecipeFindUniqueArgs>(args: SelectSubset<T, ToppingRecipeFindUniqueArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ToppingRecipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ToppingRecipeFindUniqueOrThrowArgs} args - Arguments to find a ToppingRecipe
     * @example
     * // Get one ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ToppingRecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, ToppingRecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToppingRecipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeFindFirstArgs} args - Arguments to find a ToppingRecipe
     * @example
     * // Get one ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ToppingRecipeFindFirstArgs>(args?: SelectSubset<T, ToppingRecipeFindFirstArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ToppingRecipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeFindFirstOrThrowArgs} args - Arguments to find a ToppingRecipe
     * @example
     * // Get one ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ToppingRecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, ToppingRecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ToppingRecipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ToppingRecipes
     * const toppingRecipes = await prisma.toppingRecipe.findMany()
     * 
     * // Get first 10 ToppingRecipes
     * const toppingRecipes = await prisma.toppingRecipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const toppingRecipeWithIdOnly = await prisma.toppingRecipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ToppingRecipeFindManyArgs>(args?: SelectSubset<T, ToppingRecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ToppingRecipe.
     * @param {ToppingRecipeCreateArgs} args - Arguments to create a ToppingRecipe.
     * @example
     * // Create one ToppingRecipe
     * const ToppingRecipe = await prisma.toppingRecipe.create({
     *   data: {
     *     // ... data to create a ToppingRecipe
     *   }
     * })
     * 
     */
    create<T extends ToppingRecipeCreateArgs>(args: SelectSubset<T, ToppingRecipeCreateArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ToppingRecipes.
     * @param {ToppingRecipeCreateManyArgs} args - Arguments to create many ToppingRecipes.
     * @example
     * // Create many ToppingRecipes
     * const toppingRecipe = await prisma.toppingRecipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ToppingRecipeCreateManyArgs>(args?: SelectSubset<T, ToppingRecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ToppingRecipes and returns the data saved in the database.
     * @param {ToppingRecipeCreateManyAndReturnArgs} args - Arguments to create many ToppingRecipes.
     * @example
     * // Create many ToppingRecipes
     * const toppingRecipe = await prisma.toppingRecipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ToppingRecipes and only return the `id`
     * const toppingRecipeWithIdOnly = await prisma.toppingRecipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ToppingRecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, ToppingRecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ToppingRecipe.
     * @param {ToppingRecipeDeleteArgs} args - Arguments to delete one ToppingRecipe.
     * @example
     * // Delete one ToppingRecipe
     * const ToppingRecipe = await prisma.toppingRecipe.delete({
     *   where: {
     *     // ... filter to delete one ToppingRecipe
     *   }
     * })
     * 
     */
    delete<T extends ToppingRecipeDeleteArgs>(args: SelectSubset<T, ToppingRecipeDeleteArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ToppingRecipe.
     * @param {ToppingRecipeUpdateArgs} args - Arguments to update one ToppingRecipe.
     * @example
     * // Update one ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ToppingRecipeUpdateArgs>(args: SelectSubset<T, ToppingRecipeUpdateArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ToppingRecipes.
     * @param {ToppingRecipeDeleteManyArgs} args - Arguments to filter ToppingRecipes to delete.
     * @example
     * // Delete a few ToppingRecipes
     * const { count } = await prisma.toppingRecipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ToppingRecipeDeleteManyArgs>(args?: SelectSubset<T, ToppingRecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToppingRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ToppingRecipes
     * const toppingRecipe = await prisma.toppingRecipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ToppingRecipeUpdateManyArgs>(args: SelectSubset<T, ToppingRecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ToppingRecipes and returns the data updated in the database.
     * @param {ToppingRecipeUpdateManyAndReturnArgs} args - Arguments to update many ToppingRecipes.
     * @example
     * // Update many ToppingRecipes
     * const toppingRecipe = await prisma.toppingRecipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ToppingRecipes and only return the `id`
     * const toppingRecipeWithIdOnly = await prisma.toppingRecipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ToppingRecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, ToppingRecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ToppingRecipe.
     * @param {ToppingRecipeUpsertArgs} args - Arguments to update or create a ToppingRecipe.
     * @example
     * // Update or create a ToppingRecipe
     * const toppingRecipe = await prisma.toppingRecipe.upsert({
     *   create: {
     *     // ... data to create a ToppingRecipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ToppingRecipe we want to update
     *   }
     * })
     */
    upsert<T extends ToppingRecipeUpsertArgs>(args: SelectSubset<T, ToppingRecipeUpsertArgs<ExtArgs>>): Prisma__ToppingRecipeClient<$Result.GetResult<Prisma.$ToppingRecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ToppingRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeCountArgs} args - Arguments to filter ToppingRecipes to count.
     * @example
     * // Count the number of ToppingRecipes
     * const count = await prisma.toppingRecipe.count({
     *   where: {
     *     // ... the filter for the ToppingRecipes we want to count
     *   }
     * })
    **/
    count<T extends ToppingRecipeCountArgs>(
      args?: Subset<T, ToppingRecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ToppingRecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ToppingRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ToppingRecipeAggregateArgs>(args: Subset<T, ToppingRecipeAggregateArgs>): Prisma.PrismaPromise<GetToppingRecipeAggregateType<T>>

    /**
     * Group by ToppingRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ToppingRecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ToppingRecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ToppingRecipeGroupByArgs['orderBy'] }
        : { orderBy?: ToppingRecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ToppingRecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetToppingRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ToppingRecipe model
   */
  readonly fields: ToppingRecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ToppingRecipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ToppingRecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    material<T extends MaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaterialDefaultArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topping<T extends ToppingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ToppingDefaultArgs<ExtArgs>>): Prisma__ToppingClient<$Result.GetResult<Prisma.$ToppingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ToppingRecipe model
   */
  interface ToppingRecipeFieldRefs {
    readonly id: FieldRef<"ToppingRecipe", 'String'>
    readonly topping_id: FieldRef<"ToppingRecipe", 'String'>
    readonly material_id: FieldRef<"ToppingRecipe", 'String'>
    readonly quantity: FieldRef<"ToppingRecipe", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * ToppingRecipe findUnique
   */
  export type ToppingRecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ToppingRecipe to fetch.
     */
    where: ToppingRecipeWhereUniqueInput
  }

  /**
   * ToppingRecipe findUniqueOrThrow
   */
  export type ToppingRecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ToppingRecipe to fetch.
     */
    where: ToppingRecipeWhereUniqueInput
  }

  /**
   * ToppingRecipe findFirst
   */
  export type ToppingRecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ToppingRecipe to fetch.
     */
    where?: ToppingRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToppingRecipes to fetch.
     */
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToppingRecipes.
     */
    cursor?: ToppingRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToppingRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToppingRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToppingRecipes.
     */
    distinct?: ToppingRecipeScalarFieldEnum | ToppingRecipeScalarFieldEnum[]
  }

  /**
   * ToppingRecipe findFirstOrThrow
   */
  export type ToppingRecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ToppingRecipe to fetch.
     */
    where?: ToppingRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToppingRecipes to fetch.
     */
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ToppingRecipes.
     */
    cursor?: ToppingRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToppingRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToppingRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToppingRecipes.
     */
    distinct?: ToppingRecipeScalarFieldEnum | ToppingRecipeScalarFieldEnum[]
  }

  /**
   * ToppingRecipe findMany
   */
  export type ToppingRecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter, which ToppingRecipes to fetch.
     */
    where?: ToppingRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ToppingRecipes to fetch.
     */
    orderBy?: ToppingRecipeOrderByWithRelationInput | ToppingRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ToppingRecipes.
     */
    cursor?: ToppingRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ToppingRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ToppingRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ToppingRecipes.
     */
    distinct?: ToppingRecipeScalarFieldEnum | ToppingRecipeScalarFieldEnum[]
  }

  /**
   * ToppingRecipe create
   */
  export type ToppingRecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a ToppingRecipe.
     */
    data: XOR<ToppingRecipeCreateInput, ToppingRecipeUncheckedCreateInput>
  }

  /**
   * ToppingRecipe createMany
   */
  export type ToppingRecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ToppingRecipes.
     */
    data: ToppingRecipeCreateManyInput | ToppingRecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ToppingRecipe createManyAndReturn
   */
  export type ToppingRecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * The data used to create many ToppingRecipes.
     */
    data: ToppingRecipeCreateManyInput | ToppingRecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToppingRecipe update
   */
  export type ToppingRecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a ToppingRecipe.
     */
    data: XOR<ToppingRecipeUpdateInput, ToppingRecipeUncheckedUpdateInput>
    /**
     * Choose, which ToppingRecipe to update.
     */
    where: ToppingRecipeWhereUniqueInput
  }

  /**
   * ToppingRecipe updateMany
   */
  export type ToppingRecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ToppingRecipes.
     */
    data: XOR<ToppingRecipeUpdateManyMutationInput, ToppingRecipeUncheckedUpdateManyInput>
    /**
     * Filter which ToppingRecipes to update
     */
    where?: ToppingRecipeWhereInput
    /**
     * Limit how many ToppingRecipes to update.
     */
    limit?: number
  }

  /**
   * ToppingRecipe updateManyAndReturn
   */
  export type ToppingRecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * The data used to update ToppingRecipes.
     */
    data: XOR<ToppingRecipeUpdateManyMutationInput, ToppingRecipeUncheckedUpdateManyInput>
    /**
     * Filter which ToppingRecipes to update
     */
    where?: ToppingRecipeWhereInput
    /**
     * Limit how many ToppingRecipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ToppingRecipe upsert
   */
  export type ToppingRecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the ToppingRecipe to update in case it exists.
     */
    where: ToppingRecipeWhereUniqueInput
    /**
     * In case the ToppingRecipe found by the `where` argument doesn't exist, create a new ToppingRecipe with this data.
     */
    create: XOR<ToppingRecipeCreateInput, ToppingRecipeUncheckedCreateInput>
    /**
     * In case the ToppingRecipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ToppingRecipeUpdateInput, ToppingRecipeUncheckedUpdateInput>
  }

  /**
   * ToppingRecipe delete
   */
  export type ToppingRecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
    /**
     * Filter which ToppingRecipe to delete.
     */
    where: ToppingRecipeWhereUniqueInput
  }

  /**
   * ToppingRecipe deleteMany
   */
  export type ToppingRecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ToppingRecipes to delete
     */
    where?: ToppingRecipeWhereInput
    /**
     * Limit how many ToppingRecipes to delete.
     */
    limit?: number
  }

  /**
   * ToppingRecipe without action
   */
  export type ToppingRecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ToppingRecipe
     */
    select?: ToppingRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ToppingRecipe
     */
    omit?: ToppingRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ToppingRecipeInclude<ExtArgs> | null
  }


  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  export type TableMinAggregateOutputType = {
    id: string | null
    branch_id: string | null
    name: string | null
    area: string | null
    status: string | null
  }

  export type TableMaxAggregateOutputType = {
    id: string | null
    branch_id: string | null
    name: string | null
    area: string | null
    status: string | null
  }

  export type TableCountAggregateOutputType = {
    id: number
    branch_id: number
    name: number
    area: number
    status: number
    _all: number
  }


  export type TableMinAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    area?: true
    status?: true
  }

  export type TableMaxAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    area?: true
    status?: true
  }

  export type TableCountAggregateInputType = {
    id?: true
    branch_id?: true
    name?: true
    area?: true
    status?: true
    _all?: true
  }

  export type TableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tables
    **/
    _count?: true | TableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableMaxAggregateInputType
  }

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
        [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>
  }




  export type TableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
    orderBy?: TableOrderByWithAggregationInput | TableOrderByWithAggregationInput[]
    by: TableScalarFieldEnum[] | TableScalarFieldEnum
    having?: TableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableCountAggregateInputType | true
    _min?: TableMinAggregateInputType
    _max?: TableMaxAggregateInputType
  }

  export type TableGroupByOutputType = {
    id: string
    branch_id: string | null
    name: string
    area: string
    status: string
    _count: TableCountAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  type GetTableGroupByPayload<T extends TableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>
        }
      >
    >


  export type TableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    area?: boolean
    status?: boolean
    orders?: boolean | Table$ordersArgs<ExtArgs>
    branch?: boolean | Table$branchArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    area?: boolean
    status?: boolean
    branch?: boolean | Table$branchArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_id?: boolean
    name?: boolean
    area?: boolean
    status?: boolean
    branch?: boolean | Table$branchArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectScalar = {
    id?: boolean
    branch_id?: boolean
    name?: boolean
    area?: boolean
    status?: boolean
  }

  export type TableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "branch_id" | "name" | "area" | "status", ExtArgs["result"]["table"]>
  export type TableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Table$ordersArgs<ExtArgs>
    branch?: boolean | Table$branchArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Table$branchArgs<ExtArgs>
  }
  export type TableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | Table$branchArgs<ExtArgs>
  }

  export type $TablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Table"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      branch: Prisma.$BranchPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      branch_id: string | null
      name: string
      area: string
      status: string
    }, ExtArgs["result"]["table"]>
    composites: {}
  }

  type TableGetPayload<S extends boolean | null | undefined | TableDefaultArgs> = $Result.GetResult<Prisma.$TablePayload, S>

  type TableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TableCountAggregateInputType | true
    }

  export interface TableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Table'], meta: { name: 'Table' } }
    /**
     * Find zero or one Table that matches the filter.
     * @param {TableFindUniqueArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableFindUniqueArgs>(args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Table that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableFindUniqueOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableFindFirstArgs>(args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tables
     * const tables = await prisma.table.findMany()
     * 
     * // Get first 10 Tables
     * const tables = await prisma.table.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tableWithIdOnly = await prisma.table.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TableFindManyArgs>(args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Table.
     * @param {TableCreateArgs} args - Arguments to create a Table.
     * @example
     * // Create one Table
     * const Table = await prisma.table.create({
     *   data: {
     *     // ... data to create a Table
     *   }
     * })
     * 
     */
    create<T extends TableCreateArgs>(args: SelectSubset<T, TableCreateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tables.
     * @param {TableCreateManyArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TableCreateManyArgs>(args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tables and returns the data saved in the database.
     * @param {TableCreateManyAndReturnArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Table.
     * @param {TableDeleteArgs} args - Arguments to delete one Table.
     * @example
     * // Delete one Table
     * const Table = await prisma.table.delete({
     *   where: {
     *     // ... filter to delete one Table
     *   }
     * })
     * 
     */
    delete<T extends TableDeleteArgs>(args: SelectSubset<T, TableDeleteArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Table.
     * @param {TableUpdateArgs} args - Arguments to update one Table.
     * @example
     * // Update one Table
     * const table = await prisma.table.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TableUpdateArgs>(args: SelectSubset<T, TableUpdateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tables.
     * @param {TableDeleteManyArgs} args - Arguments to filter Tables to delete.
     * @example
     * // Delete a few Tables
     * const { count } = await prisma.table.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TableDeleteManyArgs>(args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TableUpdateManyArgs>(args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables and returns the data updated in the database.
     * @param {TableUpdateManyAndReturnArgs} args - Arguments to update many Tables.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tables and only return the `id`
     * const tableWithIdOnly = await prisma.table.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Table.
     * @param {TableUpsertArgs} args - Arguments to update or create a Table.
     * @example
     * // Update or create a Table
     * const table = await prisma.table.upsert({
     *   create: {
     *     // ... data to create a Table
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Table we want to update
     *   }
     * })
     */
    upsert<T extends TableUpsertArgs>(args: SelectSubset<T, TableUpsertArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableCountArgs} args - Arguments to filter Tables to count.
     * @example
     * // Count the number of Tables
     * const count = await prisma.table.count({
     *   where: {
     *     // ... the filter for the Tables we want to count
     *   }
     * })
    **/
    count<T extends TableCountArgs>(
      args?: Subset<T, TableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TableAggregateArgs>(args: Subset<T, TableAggregateArgs>): Prisma.PrismaPromise<GetTableAggregateType<T>>

    /**
     * Group by Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs['orderBy'] }
        : { orderBy?: TableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Table model
   */
  readonly fields: TableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Table.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Table$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Table$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branch<T extends Table$branchArgs<ExtArgs> = {}>(args?: Subset<T, Table$branchArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly id: FieldRef<"Table", 'String'>
    readonly branch_id: FieldRef<"Table", 'String'>
    readonly name: FieldRef<"Table", 'String'>
    readonly area: FieldRef<"Table", 'String'>
    readonly status: FieldRef<"Table", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findMany
   */
  export type TableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table create
   */
  export type TableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>
  }

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table update
   */
  export type TableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
  }

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table upsert
   */
  export type TableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>
  }

  /**
   * Table delete
   */
  export type TableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to delete.
     */
    limit?: number
  }

  /**
   * Table.orders
   */
  export type Table$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Table.branch
   */
  export type Table$branchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
  }

  /**
   * Table without action
   */
  export type TableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BranchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    created_at: 'created_at'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name_vi: 'name_vi',
    name_en: 'name_en',
    category: 'category',
    available: 'available',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductVariantScalarFieldEnum: {
    id: 'id',
    product_id: 'product_id',
    size: 'size',
    price: 'price'
  };

  export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum]


  export const ToppingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    available: 'available'
  };

  export type ToppingScalarFieldEnum = (typeof ToppingScalarFieldEnum)[keyof typeof ToppingScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    name: 'name',
    position_name: 'position_name',
    role: 'role',
    branch_id: 'branch_id',
    created_at: 'created_at'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    order_number: 'order_number',
    total_amount: 'total_amount',
    discount_amount: 'discount_amount',
    final_amount: 'final_amount',
    payment_method: 'payment_method',
    status: 'status',
    order_type: 'order_type',
    source: 'source',
    branch_id: 'branch_id',
    table_id: 'table_id',
    note: 'note',
    created_at: 'created_at',
    print_count: 'print_count'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    order_id: 'order_id',
    product_id: 'product_id',
    variant_id: 'variant_id',
    quantity: 'quantity',
    unit_price: 'unit_price',
    subtotal: 'subtotal',
    note: 'note'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const OrderItemToppingScalarFieldEnum: {
    id: 'id',
    order_item_id: 'order_item_id',
    topping_id: 'topping_id',
    name: 'name',
    price: 'price'
  };

  export type OrderItemToppingScalarFieldEnum = (typeof OrderItemToppingScalarFieldEnum)[keyof typeof OrderItemToppingScalarFieldEnum]


  export const MaterialScalarFieldEnum: {
    id: 'id',
    branch_id: 'branch_id',
    name: 'name',
    unit: 'unit',
    cost_per_unit: 'cost_per_unit',
    stock_current: 'stock_current'
  };

  export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum]


  export const MaterialTransactionScalarFieldEnum: {
    id: 'id',
    material_id: 'material_id',
    type: 'type',
    quantity: 'quantity',
    note: 'note',
    created_at: 'created_at'
  };

  export type MaterialTransactionScalarFieldEnum = (typeof MaterialTransactionScalarFieldEnum)[keyof typeof MaterialTransactionScalarFieldEnum]


  export const ProductRecipeScalarFieldEnum: {
    id: 'id',
    variant_id: 'variant_id',
    material_id: 'material_id',
    quantity: 'quantity'
  };

  export type ProductRecipeScalarFieldEnum = (typeof ProductRecipeScalarFieldEnum)[keyof typeof ProductRecipeScalarFieldEnum]


  export const ToppingRecipeScalarFieldEnum: {
    id: 'id',
    topping_id: 'topping_id',
    material_id: 'material_id',
    quantity: 'quantity'
  };

  export type ToppingRecipeScalarFieldEnum = (typeof ToppingRecipeScalarFieldEnum)[keyof typeof ToppingRecipeScalarFieldEnum]


  export const TableScalarFieldEnum: {
    id: 'id',
    branch_id: 'branch_id',
    name: 'name',
    area: 'area',
    status: 'status'
  };

  export type TableScalarFieldEnum = (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: StringFilter<"Branch"> | string
    name?: StringFilter<"Branch"> | string
    address?: StringNullableFilter<"Branch"> | string | null
    phone?: StringNullableFilter<"Branch"> | string | null
    created_at?: DateTimeFilter<"Branch"> | Date | string
    orders?: OrderListRelationFilter
    employees?: EmployeeListRelationFilter
    materials?: MaterialListRelationFilter
    tables?: TableListRelationFilter
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    employees?: EmployeeOrderByRelationAggregateInput
    materials?: MaterialOrderByRelationAggregateInput
    tables?: TableOrderByRelationAggregateInput
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    address?: StringNullableFilter<"Branch"> | string | null
    phone?: StringNullableFilter<"Branch"> | string | null
    created_at?: DateTimeFilter<"Branch"> | Date | string
    orders?: OrderListRelationFilter
    employees?: EmployeeListRelationFilter
    materials?: MaterialListRelationFilter
    tables?: TableListRelationFilter
  }, "id" | "name">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Branch"> | string
    name?: StringWithAggregatesFilter<"Branch"> | string
    address?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name_vi?: StringFilter<"Product"> | string
    name_en?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    available?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    order_items?: OrderItemListRelationFilter
    variants?: ProductVariantListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name_vi?: SortOrder
    name_en?: SortOrder
    category?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    order_items?: OrderItemOrderByRelationAggregateInput
    variants?: ProductVariantOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name_vi?: StringFilter<"Product"> | string
    name_en?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    available?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    order_items?: OrderItemListRelationFilter
    variants?: ProductVariantListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name_vi?: SortOrder
    name_en?: SortOrder
    category?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name_vi?: StringWithAggregatesFilter<"Product"> | string
    name_en?: StringWithAggregatesFilter<"Product"> | string
    category?: StringWithAggregatesFilter<"Product"> | string
    available?: BoolWithAggregatesFilter<"Product"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    product_id?: StringFilter<"ProductVariant"> | string
    size?: StringFilter<"ProductVariant"> | string
    price?: FloatFilter<"ProductVariant"> | number
    order_items?: OrderItemListRelationFilter
    recipes?: ProductRecipeListRelationFilter
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder
    product_id?: SortOrder
    size?: SortOrder
    price?: SortOrder
    order_items?: OrderItemOrderByRelationAggregateInput
    recipes?: ProductRecipeOrderByRelationAggregateInput
    product?: ProductOrderByWithRelationInput
  }

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    product_id?: StringFilter<"ProductVariant"> | string
    size?: StringFilter<"ProductVariant"> | string
    price?: FloatFilter<"ProductVariant"> | number
    order_items?: OrderItemListRelationFilter
    recipes?: ProductRecipeListRelationFilter
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder
    product_id?: SortOrder
    size?: SortOrder
    price?: SortOrder
    _count?: ProductVariantCountOrderByAggregateInput
    _avg?: ProductVariantAvgOrderByAggregateInput
    _max?: ProductVariantMaxOrderByAggregateInput
    _min?: ProductVariantMinOrderByAggregateInput
    _sum?: ProductVariantSumOrderByAggregateInput
  }

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    OR?: ProductVariantScalarWhereWithAggregatesInput[]
    NOT?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductVariant"> | string
    product_id?: StringWithAggregatesFilter<"ProductVariant"> | string
    size?: StringWithAggregatesFilter<"ProductVariant"> | string
    price?: FloatWithAggregatesFilter<"ProductVariant"> | number
  }

  export type ToppingWhereInput = {
    AND?: ToppingWhereInput | ToppingWhereInput[]
    OR?: ToppingWhereInput[]
    NOT?: ToppingWhereInput | ToppingWhereInput[]
    id?: StringFilter<"Topping"> | string
    name?: StringFilter<"Topping"> | string
    price?: FloatFilter<"Topping"> | number
    available?: BoolFilter<"Topping"> | boolean
    order_items?: OrderItemToppingListRelationFilter
    recipes?: ToppingRecipeListRelationFilter
  }

  export type ToppingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    available?: SortOrder
    order_items?: OrderItemToppingOrderByRelationAggregateInput
    recipes?: ToppingRecipeOrderByRelationAggregateInput
  }

  export type ToppingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ToppingWhereInput | ToppingWhereInput[]
    OR?: ToppingWhereInput[]
    NOT?: ToppingWhereInput | ToppingWhereInput[]
    name?: StringFilter<"Topping"> | string
    price?: FloatFilter<"Topping"> | number
    available?: BoolFilter<"Topping"> | boolean
    order_items?: OrderItemToppingListRelationFilter
    recipes?: ToppingRecipeListRelationFilter
  }, "id">

  export type ToppingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    available?: SortOrder
    _count?: ToppingCountOrderByAggregateInput
    _avg?: ToppingAvgOrderByAggregateInput
    _max?: ToppingMaxOrderByAggregateInput
    _min?: ToppingMinOrderByAggregateInput
    _sum?: ToppingSumOrderByAggregateInput
  }

  export type ToppingScalarWhereWithAggregatesInput = {
    AND?: ToppingScalarWhereWithAggregatesInput | ToppingScalarWhereWithAggregatesInput[]
    OR?: ToppingScalarWhereWithAggregatesInput[]
    NOT?: ToppingScalarWhereWithAggregatesInput | ToppingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Topping"> | string
    name?: StringWithAggregatesFilter<"Topping"> | string
    price?: FloatWithAggregatesFilter<"Topping"> | number
    available?: BoolWithAggregatesFilter<"Topping"> | boolean
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    username?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    position_name?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    branch_id?: StringNullableFilter<"Employee"> | string | null
    created_at?: DateTimeFilter<"Employee"> | Date | string
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position_name?: SortOrder
    role?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    branch?: BranchOrderByWithRelationInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    password?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    position_name?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    branch_id?: StringNullableFilter<"Employee"> | string | null
    created_at?: DateTimeFilter<"Employee"> | Date | string
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
  }, "id" | "username">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position_name?: SortOrder
    role?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    username?: StringWithAggregatesFilter<"Employee"> | string
    password?: StringWithAggregatesFilter<"Employee"> | string
    name?: StringWithAggregatesFilter<"Employee"> | string
    position_name?: StringWithAggregatesFilter<"Employee"> | string
    role?: StringWithAggregatesFilter<"Employee"> | string
    branch_id?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    order_number?: StringFilter<"Order"> | string
    total_amount?: FloatFilter<"Order"> | number
    discount_amount?: FloatFilter<"Order"> | number
    final_amount?: FloatFilter<"Order"> | number
    payment_method?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    order_type?: StringFilter<"Order"> | string
    source?: StringFilter<"Order"> | string
    branch_id?: StringNullableFilter<"Order"> | string | null
    table_id?: StringNullableFilter<"Order"> | string | null
    note?: StringNullableFilter<"Order"> | string | null
    created_at?: DateTimeFilter<"Order"> | Date | string
    print_count?: IntFilter<"Order"> | number
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    table?: XOR<TableNullableScalarRelationFilter, TableWhereInput> | null
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    order_number?: SortOrder
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    order_type?: SortOrder
    source?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    table_id?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    print_count?: SortOrder
    branch?: BranchOrderByWithRelationInput
    table?: TableOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    order_number?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    total_amount?: FloatFilter<"Order"> | number
    discount_amount?: FloatFilter<"Order"> | number
    final_amount?: FloatFilter<"Order"> | number
    payment_method?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    order_type?: StringFilter<"Order"> | string
    source?: StringFilter<"Order"> | string
    branch_id?: StringNullableFilter<"Order"> | string | null
    table_id?: StringNullableFilter<"Order"> | string | null
    note?: StringNullableFilter<"Order"> | string | null
    created_at?: DateTimeFilter<"Order"> | Date | string
    print_count?: IntFilter<"Order"> | number
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    table?: XOR<TableNullableScalarRelationFilter, TableWhereInput> | null
    items?: OrderItemListRelationFilter
  }, "id" | "order_number">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    order_number?: SortOrder
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    order_type?: SortOrder
    source?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    table_id?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    print_count?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    order_number?: StringWithAggregatesFilter<"Order"> | string
    total_amount?: FloatWithAggregatesFilter<"Order"> | number
    discount_amount?: FloatWithAggregatesFilter<"Order"> | number
    final_amount?: FloatWithAggregatesFilter<"Order"> | number
    payment_method?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    order_type?: StringWithAggregatesFilter<"Order"> | string
    source?: StringWithAggregatesFilter<"Order"> | string
    branch_id?: StringNullableWithAggregatesFilter<"Order"> | string | null
    table_id?: StringNullableWithAggregatesFilter<"Order"> | string | null
    note?: StringNullableWithAggregatesFilter<"Order"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    print_count?: IntWithAggregatesFilter<"Order"> | number
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    order_id?: StringFilter<"OrderItem"> | string
    product_id?: StringFilter<"OrderItem"> | string
    variant_id?: StringNullableFilter<"OrderItem"> | string | null
    quantity?: IntFilter<"OrderItem"> | number
    unit_price?: FloatFilter<"OrderItem"> | number
    subtotal?: FloatFilter<"OrderItem"> | number
    note?: StringNullableFilter<"OrderItem"> | string | null
    toppings?: OrderItemToppingListRelationFilter
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    order_id?: SortOrder
    product_id?: SortOrder
    variant_id?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
    note?: SortOrderInput | SortOrder
    toppings?: OrderItemToppingOrderByRelationAggregateInput
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    order_id?: StringFilter<"OrderItem"> | string
    product_id?: StringFilter<"OrderItem"> | string
    variant_id?: StringNullableFilter<"OrderItem"> | string | null
    quantity?: IntFilter<"OrderItem"> | number
    unit_price?: FloatFilter<"OrderItem"> | number
    subtotal?: FloatFilter<"OrderItem"> | number
    note?: StringNullableFilter<"OrderItem"> | string | null
    toppings?: OrderItemToppingListRelationFilter
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    order_id?: SortOrder
    product_id?: SortOrder
    variant_id?: SortOrderInput | SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    order_id?: StringWithAggregatesFilter<"OrderItem"> | string
    product_id?: StringWithAggregatesFilter<"OrderItem"> | string
    variant_id?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    unit_price?: FloatWithAggregatesFilter<"OrderItem"> | number
    subtotal?: FloatWithAggregatesFilter<"OrderItem"> | number
    note?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
  }

  export type OrderItemToppingWhereInput = {
    AND?: OrderItemToppingWhereInput | OrderItemToppingWhereInput[]
    OR?: OrderItemToppingWhereInput[]
    NOT?: OrderItemToppingWhereInput | OrderItemToppingWhereInput[]
    id?: StringFilter<"OrderItemTopping"> | string
    order_item_id?: StringFilter<"OrderItemTopping"> | string
    topping_id?: StringFilter<"OrderItemTopping"> | string
    name?: StringFilter<"OrderItemTopping"> | string
    price?: FloatFilter<"OrderItemTopping"> | number
    order_item?: XOR<OrderItemScalarRelationFilter, OrderItemWhereInput>
    topping?: XOR<ToppingScalarRelationFilter, ToppingWhereInput>
  }

  export type OrderItemToppingOrderByWithRelationInput = {
    id?: SortOrder
    order_item_id?: SortOrder
    topping_id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    order_item?: OrderItemOrderByWithRelationInput
    topping?: ToppingOrderByWithRelationInput
  }

  export type OrderItemToppingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemToppingWhereInput | OrderItemToppingWhereInput[]
    OR?: OrderItemToppingWhereInput[]
    NOT?: OrderItemToppingWhereInput | OrderItemToppingWhereInput[]
    order_item_id?: StringFilter<"OrderItemTopping"> | string
    topping_id?: StringFilter<"OrderItemTopping"> | string
    name?: StringFilter<"OrderItemTopping"> | string
    price?: FloatFilter<"OrderItemTopping"> | number
    order_item?: XOR<OrderItemScalarRelationFilter, OrderItemWhereInput>
    topping?: XOR<ToppingScalarRelationFilter, ToppingWhereInput>
  }, "id">

  export type OrderItemToppingOrderByWithAggregationInput = {
    id?: SortOrder
    order_item_id?: SortOrder
    topping_id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    _count?: OrderItemToppingCountOrderByAggregateInput
    _avg?: OrderItemToppingAvgOrderByAggregateInput
    _max?: OrderItemToppingMaxOrderByAggregateInput
    _min?: OrderItemToppingMinOrderByAggregateInput
    _sum?: OrderItemToppingSumOrderByAggregateInput
  }

  export type OrderItemToppingScalarWhereWithAggregatesInput = {
    AND?: OrderItemToppingScalarWhereWithAggregatesInput | OrderItemToppingScalarWhereWithAggregatesInput[]
    OR?: OrderItemToppingScalarWhereWithAggregatesInput[]
    NOT?: OrderItemToppingScalarWhereWithAggregatesInput | OrderItemToppingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItemTopping"> | string
    order_item_id?: StringWithAggregatesFilter<"OrderItemTopping"> | string
    topping_id?: StringWithAggregatesFilter<"OrderItemTopping"> | string
    name?: StringWithAggregatesFilter<"OrderItemTopping"> | string
    price?: FloatWithAggregatesFilter<"OrderItemTopping"> | number
  }

  export type MaterialWhereInput = {
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    id?: StringFilter<"Material"> | string
    branch_id?: StringNullableFilter<"Material"> | string | null
    name?: StringFilter<"Material"> | string
    unit?: StringFilter<"Material"> | string
    cost_per_unit?: FloatFilter<"Material"> | number
    stock_current?: FloatFilter<"Material"> | number
    transactions?: MaterialTransactionListRelationFilter
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    product_recipes?: ProductRecipeListRelationFilter
    topping_recipes?: ToppingRecipeListRelationFilter
  }

  export type MaterialOrderByWithRelationInput = {
    id?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    name?: SortOrder
    unit?: SortOrder
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
    transactions?: MaterialTransactionOrderByRelationAggregateInput
    branch?: BranchOrderByWithRelationInput
    product_recipes?: ProductRecipeOrderByRelationAggregateInput
    topping_recipes?: ToppingRecipeOrderByRelationAggregateInput
  }

  export type MaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    branch_id?: StringNullableFilter<"Material"> | string | null
    name?: StringFilter<"Material"> | string
    unit?: StringFilter<"Material"> | string
    cost_per_unit?: FloatFilter<"Material"> | number
    stock_current?: FloatFilter<"Material"> | number
    transactions?: MaterialTransactionListRelationFilter
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
    product_recipes?: ProductRecipeListRelationFilter
    topping_recipes?: ToppingRecipeListRelationFilter
  }, "id">

  export type MaterialOrderByWithAggregationInput = {
    id?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    name?: SortOrder
    unit?: SortOrder
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
    _count?: MaterialCountOrderByAggregateInput
    _avg?: MaterialAvgOrderByAggregateInput
    _max?: MaterialMaxOrderByAggregateInput
    _min?: MaterialMinOrderByAggregateInput
    _sum?: MaterialSumOrderByAggregateInput
  }

  export type MaterialScalarWhereWithAggregatesInput = {
    AND?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    OR?: MaterialScalarWhereWithAggregatesInput[]
    NOT?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Material"> | string
    branch_id?: StringNullableWithAggregatesFilter<"Material"> | string | null
    name?: StringWithAggregatesFilter<"Material"> | string
    unit?: StringWithAggregatesFilter<"Material"> | string
    cost_per_unit?: FloatWithAggregatesFilter<"Material"> | number
    stock_current?: FloatWithAggregatesFilter<"Material"> | number
  }

  export type MaterialTransactionWhereInput = {
    AND?: MaterialTransactionWhereInput | MaterialTransactionWhereInput[]
    OR?: MaterialTransactionWhereInput[]
    NOT?: MaterialTransactionWhereInput | MaterialTransactionWhereInput[]
    id?: StringFilter<"MaterialTransaction"> | string
    material_id?: StringFilter<"MaterialTransaction"> | string
    type?: StringFilter<"MaterialTransaction"> | string
    quantity?: FloatFilter<"MaterialTransaction"> | number
    note?: StringNullableFilter<"MaterialTransaction"> | string | null
    created_at?: DateTimeFilter<"MaterialTransaction"> | Date | string
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
  }

  export type MaterialTransactionOrderByWithRelationInput = {
    id?: SortOrder
    material_id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    material?: MaterialOrderByWithRelationInput
  }

  export type MaterialTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaterialTransactionWhereInput | MaterialTransactionWhereInput[]
    OR?: MaterialTransactionWhereInput[]
    NOT?: MaterialTransactionWhereInput | MaterialTransactionWhereInput[]
    material_id?: StringFilter<"MaterialTransaction"> | string
    type?: StringFilter<"MaterialTransaction"> | string
    quantity?: FloatFilter<"MaterialTransaction"> | number
    note?: StringNullableFilter<"MaterialTransaction"> | string | null
    created_at?: DateTimeFilter<"MaterialTransaction"> | Date | string
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
  }, "id">

  export type MaterialTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    material_id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: MaterialTransactionCountOrderByAggregateInput
    _avg?: MaterialTransactionAvgOrderByAggregateInput
    _max?: MaterialTransactionMaxOrderByAggregateInput
    _min?: MaterialTransactionMinOrderByAggregateInput
    _sum?: MaterialTransactionSumOrderByAggregateInput
  }

  export type MaterialTransactionScalarWhereWithAggregatesInput = {
    AND?: MaterialTransactionScalarWhereWithAggregatesInput | MaterialTransactionScalarWhereWithAggregatesInput[]
    OR?: MaterialTransactionScalarWhereWithAggregatesInput[]
    NOT?: MaterialTransactionScalarWhereWithAggregatesInput | MaterialTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaterialTransaction"> | string
    material_id?: StringWithAggregatesFilter<"MaterialTransaction"> | string
    type?: StringWithAggregatesFilter<"MaterialTransaction"> | string
    quantity?: FloatWithAggregatesFilter<"MaterialTransaction"> | number
    note?: StringNullableWithAggregatesFilter<"MaterialTransaction"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"MaterialTransaction"> | Date | string
  }

  export type ProductRecipeWhereInput = {
    AND?: ProductRecipeWhereInput | ProductRecipeWhereInput[]
    OR?: ProductRecipeWhereInput[]
    NOT?: ProductRecipeWhereInput | ProductRecipeWhereInput[]
    id?: StringFilter<"ProductRecipe"> | string
    variant_id?: StringFilter<"ProductRecipe"> | string
    material_id?: StringFilter<"ProductRecipe"> | string
    quantity?: FloatFilter<"ProductRecipe"> | number
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
    variant?: XOR<ProductVariantScalarRelationFilter, ProductVariantWhereInput>
  }

  export type ProductRecipeOrderByWithRelationInput = {
    id?: SortOrder
    variant_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
    material?: MaterialOrderByWithRelationInput
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type ProductRecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    variant_id_material_id?: ProductRecipeVariant_idMaterial_idCompoundUniqueInput
    AND?: ProductRecipeWhereInput | ProductRecipeWhereInput[]
    OR?: ProductRecipeWhereInput[]
    NOT?: ProductRecipeWhereInput | ProductRecipeWhereInput[]
    variant_id?: StringFilter<"ProductRecipe"> | string
    material_id?: StringFilter<"ProductRecipe"> | string
    quantity?: FloatFilter<"ProductRecipe"> | number
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
    variant?: XOR<ProductVariantScalarRelationFilter, ProductVariantWhereInput>
  }, "id" | "variant_id_material_id">

  export type ProductRecipeOrderByWithAggregationInput = {
    id?: SortOrder
    variant_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
    _count?: ProductRecipeCountOrderByAggregateInput
    _avg?: ProductRecipeAvgOrderByAggregateInput
    _max?: ProductRecipeMaxOrderByAggregateInput
    _min?: ProductRecipeMinOrderByAggregateInput
    _sum?: ProductRecipeSumOrderByAggregateInput
  }

  export type ProductRecipeScalarWhereWithAggregatesInput = {
    AND?: ProductRecipeScalarWhereWithAggregatesInput | ProductRecipeScalarWhereWithAggregatesInput[]
    OR?: ProductRecipeScalarWhereWithAggregatesInput[]
    NOT?: ProductRecipeScalarWhereWithAggregatesInput | ProductRecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductRecipe"> | string
    variant_id?: StringWithAggregatesFilter<"ProductRecipe"> | string
    material_id?: StringWithAggregatesFilter<"ProductRecipe"> | string
    quantity?: FloatWithAggregatesFilter<"ProductRecipe"> | number
  }

  export type ToppingRecipeWhereInput = {
    AND?: ToppingRecipeWhereInput | ToppingRecipeWhereInput[]
    OR?: ToppingRecipeWhereInput[]
    NOT?: ToppingRecipeWhereInput | ToppingRecipeWhereInput[]
    id?: StringFilter<"ToppingRecipe"> | string
    topping_id?: StringFilter<"ToppingRecipe"> | string
    material_id?: StringFilter<"ToppingRecipe"> | string
    quantity?: FloatFilter<"ToppingRecipe"> | number
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
    topping?: XOR<ToppingScalarRelationFilter, ToppingWhereInput>
  }

  export type ToppingRecipeOrderByWithRelationInput = {
    id?: SortOrder
    topping_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
    material?: MaterialOrderByWithRelationInput
    topping?: ToppingOrderByWithRelationInput
  }

  export type ToppingRecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    topping_id_material_id?: ToppingRecipeTopping_idMaterial_idCompoundUniqueInput
    AND?: ToppingRecipeWhereInput | ToppingRecipeWhereInput[]
    OR?: ToppingRecipeWhereInput[]
    NOT?: ToppingRecipeWhereInput | ToppingRecipeWhereInput[]
    topping_id?: StringFilter<"ToppingRecipe"> | string
    material_id?: StringFilter<"ToppingRecipe"> | string
    quantity?: FloatFilter<"ToppingRecipe"> | number
    material?: XOR<MaterialScalarRelationFilter, MaterialWhereInput>
    topping?: XOR<ToppingScalarRelationFilter, ToppingWhereInput>
  }, "id" | "topping_id_material_id">

  export type ToppingRecipeOrderByWithAggregationInput = {
    id?: SortOrder
    topping_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
    _count?: ToppingRecipeCountOrderByAggregateInput
    _avg?: ToppingRecipeAvgOrderByAggregateInput
    _max?: ToppingRecipeMaxOrderByAggregateInput
    _min?: ToppingRecipeMinOrderByAggregateInput
    _sum?: ToppingRecipeSumOrderByAggregateInput
  }

  export type ToppingRecipeScalarWhereWithAggregatesInput = {
    AND?: ToppingRecipeScalarWhereWithAggregatesInput | ToppingRecipeScalarWhereWithAggregatesInput[]
    OR?: ToppingRecipeScalarWhereWithAggregatesInput[]
    NOT?: ToppingRecipeScalarWhereWithAggregatesInput | ToppingRecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ToppingRecipe"> | string
    topping_id?: StringWithAggregatesFilter<"ToppingRecipe"> | string
    material_id?: StringWithAggregatesFilter<"ToppingRecipe"> | string
    quantity?: FloatWithAggregatesFilter<"ToppingRecipe"> | number
  }

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    id?: StringFilter<"Table"> | string
    branch_id?: StringNullableFilter<"Table"> | string | null
    name?: StringFilter<"Table"> | string
    area?: StringFilter<"Table"> | string
    status?: StringFilter<"Table"> | string
    orders?: OrderListRelationFilter
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
  }

  export type TableOrderByWithRelationInput = {
    id?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    name?: SortOrder
    area?: SortOrder
    status?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    branch?: BranchOrderByWithRelationInput
  }

  export type TableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    branch_id?: StringNullableFilter<"Table"> | string | null
    name?: StringFilter<"Table"> | string
    area?: StringFilter<"Table"> | string
    status?: StringFilter<"Table"> | string
    orders?: OrderListRelationFilter
    branch?: XOR<BranchNullableScalarRelationFilter, BranchWhereInput> | null
  }, "id">

  export type TableOrderByWithAggregationInput = {
    id?: SortOrder
    branch_id?: SortOrderInput | SortOrder
    name?: SortOrder
    area?: SortOrder
    status?: SortOrder
    _count?: TableCountOrderByAggregateInput
    _max?: TableMaxOrderByAggregateInput
    _min?: TableMinOrderByAggregateInput
  }

  export type TableScalarWhereWithAggregatesInput = {
    AND?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    OR?: TableScalarWhereWithAggregatesInput[]
    NOT?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Table"> | string
    branch_id?: StringNullableWithAggregatesFilter<"Table"> | string | null
    name?: StringWithAggregatesFilter<"Table"> | string
    area?: StringWithAggregatesFilter<"Table"> | string
    status?: StringWithAggregatesFilter<"Table"> | string
  }

  export type BranchCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderCreateNestedManyWithoutBranchInput
    employees?: EmployeeCreateNestedManyWithoutBranchInput
    materials?: MaterialCreateNestedManyWithoutBranchInput
    tables?: TableCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBranchInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBranchInput
    materials?: MaterialUncheckedCreateNestedManyWithoutBranchInput
    tables?: TableUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUpdateManyWithoutBranchNestedInput
    materials?: MaterialUpdateManyWithoutBranchNestedInput
    tables?: TableUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBranchNestedInput
    materials?: MaterialUncheckedUpdateManyWithoutBranchNestedInput
    tables?: TableUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
  }

  export type BranchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    order_items?: OrderItemCreateNestedManyWithoutProductInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    order_items?: OrderItemUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    order_items?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantCreateInput = {
    id?: string
    size: string
    price: number
    order_items?: OrderItemCreateNestedManyWithoutVariantInput
    recipes?: ProductRecipeCreateNestedManyWithoutVariantInput
    product: ProductCreateNestedOneWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateInput = {
    id?: string
    product_id: string
    size: string
    price: number
    order_items?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
    recipes?: ProductRecipeUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUpdateManyWithoutVariantNestedInput
    recipes?: ProductRecipeUpdateManyWithoutVariantNestedInput
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
    recipes?: ProductRecipeUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantCreateManyInput = {
    id?: string
    product_id: string
    size: string
    price: number
  }

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingCreateInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    order_items?: OrderItemToppingCreateNestedManyWithoutToppingInput
    recipes?: ToppingRecipeCreateNestedManyWithoutToppingInput
  }

  export type ToppingUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    order_items?: OrderItemToppingUncheckedCreateNestedManyWithoutToppingInput
    recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutToppingInput
  }

  export type ToppingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    order_items?: OrderItemToppingUpdateManyWithoutToppingNestedInput
    recipes?: ToppingRecipeUpdateManyWithoutToppingNestedInput
  }

  export type ToppingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    order_items?: OrderItemToppingUncheckedUpdateManyWithoutToppingNestedInput
    recipes?: ToppingRecipeUncheckedUpdateManyWithoutToppingNestedInput
  }

  export type ToppingCreateManyInput = {
    id?: string
    name: string
    price: number
    available?: boolean
  }

  export type ToppingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ToppingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    created_at?: Date | string
    branch?: BranchCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    branch_id?: string | null
    created_at?: Date | string
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneWithoutEmployeesNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateManyInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    branch_id?: string | null
    created_at?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    note?: string | null
    created_at?: Date | string
    print_count?: number
    branch?: BranchCreateNestedOneWithoutOrdersInput
    table?: TableCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    branch_id?: string | null
    table_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    branch?: BranchUpdateOneWithoutOrdersNestedInput
    table?: TableUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    table_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    branch_id?: string | null
    table_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    table_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateInput = {
    id?: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingCreateNestedManyWithoutOrder_itemInput
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrder_itemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    order_id: string
    product_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingUncheckedCreateNestedManyWithoutOrder_itemInput
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUpdateManyWithoutOrder_itemNestedInput
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUncheckedUpdateManyWithoutOrder_itemNestedInput
  }

  export type OrderItemCreateManyInput = {
    id?: string
    order_id: string
    product_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemToppingCreateInput = {
    id?: string
    name: string
    price: number
    order_item: OrderItemCreateNestedOneWithoutToppingsInput
    topping: ToppingCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemToppingUncheckedCreateInput = {
    id?: string
    order_item_id: string
    topping_id: string
    name: string
    price: number
  }

  export type OrderItemToppingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_item?: OrderItemUpdateOneRequiredWithoutToppingsNestedInput
    topping?: ToppingUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemToppingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_item_id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemToppingCreateManyInput = {
    id?: string
    order_item_id: string
    topping_id: string
    name: string
    price: number
  }

  export type OrderItemToppingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemToppingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_item_id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type MaterialCreateInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionCreateNestedManyWithoutMaterialInput
    branch?: BranchCreateNestedOneWithoutMaterialsInput
    product_recipes?: ProductRecipeCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateInput = {
    id?: string
    branch_id?: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionUncheckedCreateNestedManyWithoutMaterialInput
    product_recipes?: ProductRecipeUncheckedCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUpdateManyWithoutMaterialNestedInput
    branch?: BranchUpdateOneWithoutMaterialsNestedInput
    product_recipes?: ProductRecipeUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUncheckedUpdateManyWithoutMaterialNestedInput
    product_recipes?: ProductRecipeUncheckedUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialCreateManyInput = {
    id?: string
    branch_id?: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
  }

  export type MaterialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
  }

  export type MaterialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
  }

  export type MaterialTransactionCreateInput = {
    id?: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
    material: MaterialCreateNestedOneWithoutTransactionsInput
  }

  export type MaterialTransactionUncheckedCreateInput = {
    id?: string
    material_id: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
  }

  export type MaterialTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    material?: MaterialUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type MaterialTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTransactionCreateManyInput = {
    id?: string
    material_id: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
  }

  export type MaterialTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRecipeCreateInput = {
    id?: string
    quantity: number
    material: MaterialCreateNestedOneWithoutProduct_recipesInput
    variant: ProductVariantCreateNestedOneWithoutRecipesInput
  }

  export type ProductRecipeUncheckedCreateInput = {
    id?: string
    variant_id: string
    material_id: string
    quantity: number
  }

  export type ProductRecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    material?: MaterialUpdateOneRequiredWithoutProduct_recipesNestedInput
    variant?: ProductVariantUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type ProductRecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    variant_id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductRecipeCreateManyInput = {
    id?: string
    variant_id: string
    material_id: string
    quantity: number
  }

  export type ProductRecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductRecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    variant_id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeCreateInput = {
    id?: string
    quantity: number
    material: MaterialCreateNestedOneWithoutTopping_recipesInput
    topping: ToppingCreateNestedOneWithoutRecipesInput
  }

  export type ToppingRecipeUncheckedCreateInput = {
    id?: string
    topping_id: string
    material_id: string
    quantity: number
  }

  export type ToppingRecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    material?: MaterialUpdateOneRequiredWithoutTopping_recipesNestedInput
    topping?: ToppingUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type ToppingRecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeCreateManyInput = {
    id?: string
    topping_id: string
    material_id: string
    quantity: number
  }

  export type ToppingRecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type TableCreateInput = {
    id?: string
    name: string
    area?: string
    status?: string
    orders?: OrderCreateNestedManyWithoutTableInput
    branch?: BranchCreateNestedOneWithoutTablesInput
  }

  export type TableUncheckedCreateInput = {
    id?: string
    branch_id?: string | null
    name: string
    area?: string
    status?: string
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    orders?: OrderUpdateManyWithoutTableNestedInput
    branch?: BranchUpdateOneWithoutTablesNestedInput
  }

  export type TableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableCreateManyInput = {
    id?: string
    branch_id?: string | null
    name: string
    area?: string
    status?: string
  }

  export type TableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type MaterialListRelationFilter = {
    every?: MaterialWhereInput
    some?: MaterialWhereInput
    none?: MaterialWhereInput
  }

  export type TableListRelationFilter = {
    every?: TableWhereInput
    some?: TableWhereInput
    none?: TableWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput
    some?: ProductVariantWhereInput
    none?: ProductVariantWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name_vi?: SortOrder
    name_en?: SortOrder
    category?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name_vi?: SortOrder
    name_en?: SortOrder
    category?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name_vi?: SortOrder
    name_en?: SortOrder
    category?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProductRecipeListRelationFilter = {
    every?: ProductRecipeWhereInput
    some?: ProductRecipeWhereInput
    none?: ProductRecipeWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductRecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    size?: SortOrder
    price?: SortOrder
  }

  export type ProductVariantAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    size?: SortOrder
    price?: SortOrder
  }

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder
    product_id?: SortOrder
    size?: SortOrder
    price?: SortOrder
  }

  export type ProductVariantSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type OrderItemToppingListRelationFilter = {
    every?: OrderItemToppingWhereInput
    some?: OrderItemToppingWhereInput
    none?: OrderItemToppingWhereInput
  }

  export type ToppingRecipeListRelationFilter = {
    every?: ToppingRecipeWhereInput
    some?: ToppingRecipeWhereInput
    none?: ToppingRecipeWhereInput
  }

  export type OrderItemToppingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToppingRecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ToppingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    available?: SortOrder
  }

  export type ToppingAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ToppingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    available?: SortOrder
  }

  export type ToppingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    available?: SortOrder
  }

  export type ToppingSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type BranchNullableScalarRelationFilter = {
    is?: BranchWhereInput | null
    isNot?: BranchWhereInput | null
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position_name?: SortOrder
    role?: SortOrder
    branch_id?: SortOrder
    created_at?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position_name?: SortOrder
    role?: SortOrder
    branch_id?: SortOrder
    created_at?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    position_name?: SortOrder
    role?: SortOrder
    branch_id?: SortOrder
    created_at?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TableNullableScalarRelationFilter = {
    is?: TableWhereInput | null
    isNot?: TableWhereInput | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    order_number?: SortOrder
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    order_type?: SortOrder
    source?: SortOrder
    branch_id?: SortOrder
    table_id?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
    print_count?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    print_count?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    order_number?: SortOrder
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    order_type?: SortOrder
    source?: SortOrder
    branch_id?: SortOrder
    table_id?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
    print_count?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    order_number?: SortOrder
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    payment_method?: SortOrder
    status?: SortOrder
    order_type?: SortOrder
    source?: SortOrder
    branch_id?: SortOrder
    table_id?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
    print_count?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    total_amount?: SortOrder
    discount_amount?: SortOrder
    final_amount?: SortOrder
    print_count?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ProductVariantNullableScalarRelationFilter = {
    is?: ProductVariantWhereInput | null
    isNot?: ProductVariantWhereInput | null
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    order_id?: SortOrder
    product_id?: SortOrder
    variant_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
    note?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    order_id?: SortOrder
    product_id?: SortOrder
    variant_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
    note?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    order_id?: SortOrder
    product_id?: SortOrder
    variant_id?: SortOrder
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
    note?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unit_price?: SortOrder
    subtotal?: SortOrder
  }

  export type OrderItemScalarRelationFilter = {
    is?: OrderItemWhereInput
    isNot?: OrderItemWhereInput
  }

  export type ToppingScalarRelationFilter = {
    is?: ToppingWhereInput
    isNot?: ToppingWhereInput
  }

  export type OrderItemToppingCountOrderByAggregateInput = {
    id?: SortOrder
    order_item_id?: SortOrder
    topping_id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type OrderItemToppingAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type OrderItemToppingMaxOrderByAggregateInput = {
    id?: SortOrder
    order_item_id?: SortOrder
    topping_id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type OrderItemToppingMinOrderByAggregateInput = {
    id?: SortOrder
    order_item_id?: SortOrder
    topping_id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type OrderItemToppingSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type MaterialTransactionListRelationFilter = {
    every?: MaterialTransactionWhereInput
    some?: MaterialTransactionWhereInput
    none?: MaterialTransactionWhereInput
  }

  export type MaterialTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaterialCountOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
  }

  export type MaterialAvgOrderByAggregateInput = {
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
  }

  export type MaterialMaxOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
  }

  export type MaterialMinOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    unit?: SortOrder
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
  }

  export type MaterialSumOrderByAggregateInput = {
    cost_per_unit?: SortOrder
    stock_current?: SortOrder
  }

  export type MaterialScalarRelationFilter = {
    is?: MaterialWhereInput
    isNot?: MaterialWhereInput
  }

  export type MaterialTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    material_id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MaterialTransactionAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type MaterialTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    material_id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MaterialTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    material_id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MaterialTransactionSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ProductVariantScalarRelationFilter = {
    is?: ProductVariantWhereInput
    isNot?: ProductVariantWhereInput
  }

  export type ProductRecipeVariant_idMaterial_idCompoundUniqueInput = {
    variant_id: string
    material_id: string
  }

  export type ProductRecipeCountOrderByAggregateInput = {
    id?: SortOrder
    variant_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ProductRecipeAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ProductRecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    variant_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ProductRecipeMinOrderByAggregateInput = {
    id?: SortOrder
    variant_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ProductRecipeSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ToppingRecipeTopping_idMaterial_idCompoundUniqueInput = {
    topping_id: string
    material_id: string
  }

  export type ToppingRecipeCountOrderByAggregateInput = {
    id?: SortOrder
    topping_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ToppingRecipeAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ToppingRecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    topping_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ToppingRecipeMinOrderByAggregateInput = {
    id?: SortOrder
    topping_id?: SortOrder
    material_id?: SortOrder
    quantity?: SortOrder
  }

  export type ToppingRecipeSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type TableCountOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    area?: SortOrder
    status?: SortOrder
  }

  export type TableMaxOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    area?: SortOrder
    status?: SortOrder
  }

  export type TableMinOrderByAggregateInput = {
    id?: SortOrder
    branch_id?: SortOrder
    name?: SortOrder
    area?: SortOrder
    status?: SortOrder
  }

  export type OrderCreateNestedManyWithoutBranchInput = {
    create?: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput> | OrderCreateWithoutBranchInput[] | OrderUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBranchInput | OrderCreateOrConnectWithoutBranchInput[]
    createMany?: OrderCreateManyBranchInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type EmployeeCreateNestedManyWithoutBranchInput = {
    create?: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput> | EmployeeCreateWithoutBranchInput[] | EmployeeUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBranchInput | EmployeeCreateOrConnectWithoutBranchInput[]
    createMany?: EmployeeCreateManyBranchInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type MaterialCreateNestedManyWithoutBranchInput = {
    create?: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput> | MaterialCreateWithoutBranchInput[] | MaterialUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MaterialCreateOrConnectWithoutBranchInput | MaterialCreateOrConnectWithoutBranchInput[]
    createMany?: MaterialCreateManyBranchInputEnvelope
    connect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
  }

  export type TableCreateNestedManyWithoutBranchInput = {
    create?: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput> | TableCreateWithoutBranchInput[] | TableUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBranchInput | TableCreateOrConnectWithoutBranchInput[]
    createMany?: TableCreateManyBranchInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput> | OrderCreateWithoutBranchInput[] | OrderUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBranchInput | OrderCreateOrConnectWithoutBranchInput[]
    createMany?: OrderCreateManyBranchInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput> | EmployeeCreateWithoutBranchInput[] | EmployeeUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBranchInput | EmployeeCreateOrConnectWithoutBranchInput[]
    createMany?: EmployeeCreateManyBranchInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type MaterialUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput> | MaterialCreateWithoutBranchInput[] | MaterialUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MaterialCreateOrConnectWithoutBranchInput | MaterialCreateOrConnectWithoutBranchInput[]
    createMany?: MaterialCreateManyBranchInputEnvelope
    connect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
  }

  export type TableUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput> | TableCreateWithoutBranchInput[] | TableUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBranchInput | TableCreateOrConnectWithoutBranchInput[]
    createMany?: TableCreateManyBranchInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderUpdateManyWithoutBranchNestedInput = {
    create?: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput> | OrderCreateWithoutBranchInput[] | OrderUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBranchInput | OrderCreateOrConnectWithoutBranchInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBranchInput | OrderUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: OrderCreateManyBranchInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBranchInput | OrderUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBranchInput | OrderUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type EmployeeUpdateManyWithoutBranchNestedInput = {
    create?: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput> | EmployeeCreateWithoutBranchInput[] | EmployeeUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBranchInput | EmployeeCreateOrConnectWithoutBranchInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutBranchInput | EmployeeUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: EmployeeCreateManyBranchInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutBranchInput | EmployeeUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutBranchInput | EmployeeUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type MaterialUpdateManyWithoutBranchNestedInput = {
    create?: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput> | MaterialCreateWithoutBranchInput[] | MaterialUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MaterialCreateOrConnectWithoutBranchInput | MaterialCreateOrConnectWithoutBranchInput[]
    upsert?: MaterialUpsertWithWhereUniqueWithoutBranchInput | MaterialUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: MaterialCreateManyBranchInputEnvelope
    set?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    disconnect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    delete?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    connect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    update?: MaterialUpdateWithWhereUniqueWithoutBranchInput | MaterialUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: MaterialUpdateManyWithWhereWithoutBranchInput | MaterialUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: MaterialScalarWhereInput | MaterialScalarWhereInput[]
  }

  export type TableUpdateManyWithoutBranchNestedInput = {
    create?: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput> | TableCreateWithoutBranchInput[] | TableUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBranchInput | TableCreateOrConnectWithoutBranchInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutBranchInput | TableUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: TableCreateManyBranchInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutBranchInput | TableUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: TableUpdateManyWithWhereWithoutBranchInput | TableUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput> | OrderCreateWithoutBranchInput[] | OrderUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBranchInput | OrderCreateOrConnectWithoutBranchInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBranchInput | OrderUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: OrderCreateManyBranchInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBranchInput | OrderUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBranchInput | OrderUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput> | EmployeeCreateWithoutBranchInput[] | EmployeeUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBranchInput | EmployeeCreateOrConnectWithoutBranchInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutBranchInput | EmployeeUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: EmployeeCreateManyBranchInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutBranchInput | EmployeeUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutBranchInput | EmployeeUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type MaterialUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput> | MaterialCreateWithoutBranchInput[] | MaterialUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: MaterialCreateOrConnectWithoutBranchInput | MaterialCreateOrConnectWithoutBranchInput[]
    upsert?: MaterialUpsertWithWhereUniqueWithoutBranchInput | MaterialUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: MaterialCreateManyBranchInputEnvelope
    set?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    disconnect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    delete?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    connect?: MaterialWhereUniqueInput | MaterialWhereUniqueInput[]
    update?: MaterialUpdateWithWhereUniqueWithoutBranchInput | MaterialUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: MaterialUpdateManyWithWhereWithoutBranchInput | MaterialUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: MaterialScalarWhereInput | MaterialScalarWhereInput[]
  }

  export type TableUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput> | TableCreateWithoutBranchInput[] | TableUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: TableCreateOrConnectWithoutBranchInput | TableCreateOrConnectWithoutBranchInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutBranchInput | TableUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: TableCreateManyBranchInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutBranchInput | TableUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: TableUpdateManyWithWhereWithoutBranchInput | TableUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductRecipeCreateNestedManyWithoutVariantInput = {
    create?: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput> | ProductRecipeCreateWithoutVariantInput[] | ProductRecipeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutVariantInput | ProductRecipeCreateOrConnectWithoutVariantInput[]
    createMany?: ProductRecipeCreateManyVariantInputEnvelope
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductRecipeUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput> | ProductRecipeCreateWithoutVariantInput[] | ProductRecipeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutVariantInput | ProductRecipeCreateOrConnectWithoutVariantInput[]
    createMany?: ProductRecipeCreateManyVariantInputEnvelope
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductRecipeUpdateManyWithoutVariantNestedInput = {
    create?: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput> | ProductRecipeCreateWithoutVariantInput[] | ProductRecipeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutVariantInput | ProductRecipeCreateOrConnectWithoutVariantInput[]
    upsert?: ProductRecipeUpsertWithWhereUniqueWithoutVariantInput | ProductRecipeUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: ProductRecipeCreateManyVariantInputEnvelope
    set?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    disconnect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    delete?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    update?: ProductRecipeUpdateWithWhereUniqueWithoutVariantInput | ProductRecipeUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: ProductRecipeUpdateManyWithWhereWithoutVariantInput | ProductRecipeUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductRecipeUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput> | ProductRecipeCreateWithoutVariantInput[] | ProductRecipeUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutVariantInput | ProductRecipeCreateOrConnectWithoutVariantInput[]
    upsert?: ProductRecipeUpsertWithWhereUniqueWithoutVariantInput | ProductRecipeUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: ProductRecipeCreateManyVariantInputEnvelope
    set?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    disconnect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    delete?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    update?: ProductRecipeUpdateWithWhereUniqueWithoutVariantInput | ProductRecipeUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: ProductRecipeUpdateManyWithWhereWithoutVariantInput | ProductRecipeUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
  }

  export type OrderItemToppingCreateNestedManyWithoutToppingInput = {
    create?: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput> | OrderItemToppingCreateWithoutToppingInput[] | OrderItemToppingUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutToppingInput | OrderItemToppingCreateOrConnectWithoutToppingInput[]
    createMany?: OrderItemToppingCreateManyToppingInputEnvelope
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
  }

  export type ToppingRecipeCreateNestedManyWithoutToppingInput = {
    create?: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput> | ToppingRecipeCreateWithoutToppingInput[] | ToppingRecipeUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutToppingInput | ToppingRecipeCreateOrConnectWithoutToppingInput[]
    createMany?: ToppingRecipeCreateManyToppingInputEnvelope
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
  }

  export type OrderItemToppingUncheckedCreateNestedManyWithoutToppingInput = {
    create?: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput> | OrderItemToppingCreateWithoutToppingInput[] | OrderItemToppingUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutToppingInput | OrderItemToppingCreateOrConnectWithoutToppingInput[]
    createMany?: OrderItemToppingCreateManyToppingInputEnvelope
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
  }

  export type ToppingRecipeUncheckedCreateNestedManyWithoutToppingInput = {
    create?: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput> | ToppingRecipeCreateWithoutToppingInput[] | ToppingRecipeUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutToppingInput | ToppingRecipeCreateOrConnectWithoutToppingInput[]
    createMany?: ToppingRecipeCreateManyToppingInputEnvelope
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
  }

  export type OrderItemToppingUpdateManyWithoutToppingNestedInput = {
    create?: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput> | OrderItemToppingCreateWithoutToppingInput[] | OrderItemToppingUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutToppingInput | OrderItemToppingCreateOrConnectWithoutToppingInput[]
    upsert?: OrderItemToppingUpsertWithWhereUniqueWithoutToppingInput | OrderItemToppingUpsertWithWhereUniqueWithoutToppingInput[]
    createMany?: OrderItemToppingCreateManyToppingInputEnvelope
    set?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    disconnect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    delete?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    update?: OrderItemToppingUpdateWithWhereUniqueWithoutToppingInput | OrderItemToppingUpdateWithWhereUniqueWithoutToppingInput[]
    updateMany?: OrderItemToppingUpdateManyWithWhereWithoutToppingInput | OrderItemToppingUpdateManyWithWhereWithoutToppingInput[]
    deleteMany?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
  }

  export type ToppingRecipeUpdateManyWithoutToppingNestedInput = {
    create?: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput> | ToppingRecipeCreateWithoutToppingInput[] | ToppingRecipeUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutToppingInput | ToppingRecipeCreateOrConnectWithoutToppingInput[]
    upsert?: ToppingRecipeUpsertWithWhereUniqueWithoutToppingInput | ToppingRecipeUpsertWithWhereUniqueWithoutToppingInput[]
    createMany?: ToppingRecipeCreateManyToppingInputEnvelope
    set?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    disconnect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    delete?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    update?: ToppingRecipeUpdateWithWhereUniqueWithoutToppingInput | ToppingRecipeUpdateWithWhereUniqueWithoutToppingInput[]
    updateMany?: ToppingRecipeUpdateManyWithWhereWithoutToppingInput | ToppingRecipeUpdateManyWithWhereWithoutToppingInput[]
    deleteMany?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
  }

  export type OrderItemToppingUncheckedUpdateManyWithoutToppingNestedInput = {
    create?: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput> | OrderItemToppingCreateWithoutToppingInput[] | OrderItemToppingUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutToppingInput | OrderItemToppingCreateOrConnectWithoutToppingInput[]
    upsert?: OrderItemToppingUpsertWithWhereUniqueWithoutToppingInput | OrderItemToppingUpsertWithWhereUniqueWithoutToppingInput[]
    createMany?: OrderItemToppingCreateManyToppingInputEnvelope
    set?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    disconnect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    delete?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    update?: OrderItemToppingUpdateWithWhereUniqueWithoutToppingInput | OrderItemToppingUpdateWithWhereUniqueWithoutToppingInput[]
    updateMany?: OrderItemToppingUpdateManyWithWhereWithoutToppingInput | OrderItemToppingUpdateManyWithWhereWithoutToppingInput[]
    deleteMany?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
  }

  export type ToppingRecipeUncheckedUpdateManyWithoutToppingNestedInput = {
    create?: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput> | ToppingRecipeCreateWithoutToppingInput[] | ToppingRecipeUncheckedCreateWithoutToppingInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutToppingInput | ToppingRecipeCreateOrConnectWithoutToppingInput[]
    upsert?: ToppingRecipeUpsertWithWhereUniqueWithoutToppingInput | ToppingRecipeUpsertWithWhereUniqueWithoutToppingInput[]
    createMany?: ToppingRecipeCreateManyToppingInputEnvelope
    set?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    disconnect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    delete?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    update?: ToppingRecipeUpdateWithWhereUniqueWithoutToppingInput | ToppingRecipeUpdateWithWhereUniqueWithoutToppingInput[]
    updateMany?: ToppingRecipeUpdateManyWithWhereWithoutToppingInput | ToppingRecipeUpdateManyWithWhereWithoutToppingInput[]
    deleteMany?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
  }

  export type BranchCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<BranchCreateWithoutEmployeesInput, BranchUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: BranchCreateOrConnectWithoutEmployeesInput
    connect?: BranchWhereUniqueInput
  }

  export type BranchUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<BranchCreateWithoutEmployeesInput, BranchUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: BranchCreateOrConnectWithoutEmployeesInput
    upsert?: BranchUpsertWithoutEmployeesInput
    disconnect?: BranchWhereInput | boolean
    delete?: BranchWhereInput | boolean
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutEmployeesInput, BranchUpdateWithoutEmployeesInput>, BranchUncheckedUpdateWithoutEmployeesInput>
  }

  export type BranchCreateNestedOneWithoutOrdersInput = {
    create?: XOR<BranchCreateWithoutOrdersInput, BranchUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutOrdersInput
    connect?: BranchWhereUniqueInput
  }

  export type TableCreateNestedOneWithoutOrdersInput = {
    create?: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput
    connect?: TableWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BranchUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<BranchCreateWithoutOrdersInput, BranchUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutOrdersInput
    upsert?: BranchUpsertWithoutOrdersInput
    disconnect?: BranchWhereInput | boolean
    delete?: BranchWhereInput | boolean
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutOrdersInput, BranchUpdateWithoutOrdersInput>, BranchUncheckedUpdateWithoutOrdersInput>
  }

  export type TableUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput
    upsert?: TableUpsertWithoutOrdersInput
    disconnect?: TableWhereInput | boolean
    delete?: TableWhereInput | boolean
    connect?: TableWhereUniqueInput
    update?: XOR<XOR<TableUpdateToOneWithWhereWithoutOrdersInput, TableUpdateWithoutOrdersInput>, TableUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemToppingCreateNestedManyWithoutOrder_itemInput = {
    create?: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput> | OrderItemToppingCreateWithoutOrder_itemInput[] | OrderItemToppingUncheckedCreateWithoutOrder_itemInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutOrder_itemInput | OrderItemToppingCreateOrConnectWithoutOrder_itemInput[]
    createMany?: OrderItemToppingCreateManyOrder_itemInputEnvelope
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrder_itemsInput = {
    create?: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrder_itemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductVariantCreateNestedOneWithoutOrder_itemsInput = {
    create?: XOR<ProductVariantCreateWithoutOrder_itemsInput, ProductVariantUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrder_itemsInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type OrderItemToppingUncheckedCreateNestedManyWithoutOrder_itemInput = {
    create?: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput> | OrderItemToppingCreateWithoutOrder_itemInput[] | OrderItemToppingUncheckedCreateWithoutOrder_itemInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutOrder_itemInput | OrderItemToppingCreateOrConnectWithoutOrder_itemInput[]
    createMany?: OrderItemToppingCreateManyOrder_itemInputEnvelope
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
  }

  export type OrderItemToppingUpdateManyWithoutOrder_itemNestedInput = {
    create?: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput> | OrderItemToppingCreateWithoutOrder_itemInput[] | OrderItemToppingUncheckedCreateWithoutOrder_itemInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutOrder_itemInput | OrderItemToppingCreateOrConnectWithoutOrder_itemInput[]
    upsert?: OrderItemToppingUpsertWithWhereUniqueWithoutOrder_itemInput | OrderItemToppingUpsertWithWhereUniqueWithoutOrder_itemInput[]
    createMany?: OrderItemToppingCreateManyOrder_itemInputEnvelope
    set?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    disconnect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    delete?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    update?: OrderItemToppingUpdateWithWhereUniqueWithoutOrder_itemInput | OrderItemToppingUpdateWithWhereUniqueWithoutOrder_itemInput[]
    updateMany?: OrderItemToppingUpdateManyWithWhereWithoutOrder_itemInput | OrderItemToppingUpdateManyWithWhereWithoutOrder_itemInput[]
    deleteMany?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrder_itemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrder_itemsInput
    upsert?: ProductUpsertWithoutOrder_itemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrder_itemsInput, ProductUpdateWithoutOrder_itemsInput>, ProductUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ProductVariantUpdateOneWithoutOrder_itemsNestedInput = {
    create?: XOR<ProductVariantCreateWithoutOrder_itemsInput, ProductVariantUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrder_itemsInput
    upsert?: ProductVariantUpsertWithoutOrder_itemsInput
    disconnect?: ProductVariantWhereInput | boolean
    delete?: ProductVariantWhereInput | boolean
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutOrder_itemsInput, ProductVariantUpdateWithoutOrder_itemsInput>, ProductVariantUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type OrderItemToppingUncheckedUpdateManyWithoutOrder_itemNestedInput = {
    create?: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput> | OrderItemToppingCreateWithoutOrder_itemInput[] | OrderItemToppingUncheckedCreateWithoutOrder_itemInput[]
    connectOrCreate?: OrderItemToppingCreateOrConnectWithoutOrder_itemInput | OrderItemToppingCreateOrConnectWithoutOrder_itemInput[]
    upsert?: OrderItemToppingUpsertWithWhereUniqueWithoutOrder_itemInput | OrderItemToppingUpsertWithWhereUniqueWithoutOrder_itemInput[]
    createMany?: OrderItemToppingCreateManyOrder_itemInputEnvelope
    set?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    disconnect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    delete?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    connect?: OrderItemToppingWhereUniqueInput | OrderItemToppingWhereUniqueInput[]
    update?: OrderItemToppingUpdateWithWhereUniqueWithoutOrder_itemInput | OrderItemToppingUpdateWithWhereUniqueWithoutOrder_itemInput[]
    updateMany?: OrderItemToppingUpdateManyWithWhereWithoutOrder_itemInput | OrderItemToppingUpdateManyWithWhereWithoutOrder_itemInput[]
    deleteMany?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
  }

  export type OrderItemCreateNestedOneWithoutToppingsInput = {
    create?: XOR<OrderItemCreateWithoutToppingsInput, OrderItemUncheckedCreateWithoutToppingsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutToppingsInput
    connect?: OrderItemWhereUniqueInput
  }

  export type ToppingCreateNestedOneWithoutOrder_itemsInput = {
    create?: XOR<ToppingCreateWithoutOrder_itemsInput, ToppingUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ToppingCreateOrConnectWithoutOrder_itemsInput
    connect?: ToppingWhereUniqueInput
  }

  export type OrderItemUpdateOneRequiredWithoutToppingsNestedInput = {
    create?: XOR<OrderItemCreateWithoutToppingsInput, OrderItemUncheckedCreateWithoutToppingsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutToppingsInput
    upsert?: OrderItemUpsertWithoutToppingsInput
    connect?: OrderItemWhereUniqueInput
    update?: XOR<XOR<OrderItemUpdateToOneWithWhereWithoutToppingsInput, OrderItemUpdateWithoutToppingsInput>, OrderItemUncheckedUpdateWithoutToppingsInput>
  }

  export type ToppingUpdateOneRequiredWithoutOrder_itemsNestedInput = {
    create?: XOR<ToppingCreateWithoutOrder_itemsInput, ToppingUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ToppingCreateOrConnectWithoutOrder_itemsInput
    upsert?: ToppingUpsertWithoutOrder_itemsInput
    connect?: ToppingWhereUniqueInput
    update?: XOR<XOR<ToppingUpdateToOneWithWhereWithoutOrder_itemsInput, ToppingUpdateWithoutOrder_itemsInput>, ToppingUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type MaterialTransactionCreateNestedManyWithoutMaterialInput = {
    create?: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput> | MaterialTransactionCreateWithoutMaterialInput[] | MaterialTransactionUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: MaterialTransactionCreateOrConnectWithoutMaterialInput | MaterialTransactionCreateOrConnectWithoutMaterialInput[]
    createMany?: MaterialTransactionCreateManyMaterialInputEnvelope
    connect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
  }

  export type BranchCreateNestedOneWithoutMaterialsInput = {
    create?: XOR<BranchCreateWithoutMaterialsInput, BranchUncheckedCreateWithoutMaterialsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutMaterialsInput
    connect?: BranchWhereUniqueInput
  }

  export type ProductRecipeCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput> | ProductRecipeCreateWithoutMaterialInput[] | ProductRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutMaterialInput | ProductRecipeCreateOrConnectWithoutMaterialInput[]
    createMany?: ProductRecipeCreateManyMaterialInputEnvelope
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
  }

  export type ToppingRecipeCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput> | ToppingRecipeCreateWithoutMaterialInput[] | ToppingRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutMaterialInput | ToppingRecipeCreateOrConnectWithoutMaterialInput[]
    createMany?: ToppingRecipeCreateManyMaterialInputEnvelope
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
  }

  export type MaterialTransactionUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput> | MaterialTransactionCreateWithoutMaterialInput[] | MaterialTransactionUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: MaterialTransactionCreateOrConnectWithoutMaterialInput | MaterialTransactionCreateOrConnectWithoutMaterialInput[]
    createMany?: MaterialTransactionCreateManyMaterialInputEnvelope
    connect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
  }

  export type ProductRecipeUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput> | ProductRecipeCreateWithoutMaterialInput[] | ProductRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutMaterialInput | ProductRecipeCreateOrConnectWithoutMaterialInput[]
    createMany?: ProductRecipeCreateManyMaterialInputEnvelope
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
  }

  export type ToppingRecipeUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput> | ToppingRecipeCreateWithoutMaterialInput[] | ToppingRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutMaterialInput | ToppingRecipeCreateOrConnectWithoutMaterialInput[]
    createMany?: ToppingRecipeCreateManyMaterialInputEnvelope
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
  }

  export type MaterialTransactionUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput> | MaterialTransactionCreateWithoutMaterialInput[] | MaterialTransactionUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: MaterialTransactionCreateOrConnectWithoutMaterialInput | MaterialTransactionCreateOrConnectWithoutMaterialInput[]
    upsert?: MaterialTransactionUpsertWithWhereUniqueWithoutMaterialInput | MaterialTransactionUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: MaterialTransactionCreateManyMaterialInputEnvelope
    set?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    disconnect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    delete?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    connect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    update?: MaterialTransactionUpdateWithWhereUniqueWithoutMaterialInput | MaterialTransactionUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: MaterialTransactionUpdateManyWithWhereWithoutMaterialInput | MaterialTransactionUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: MaterialTransactionScalarWhereInput | MaterialTransactionScalarWhereInput[]
  }

  export type BranchUpdateOneWithoutMaterialsNestedInput = {
    create?: XOR<BranchCreateWithoutMaterialsInput, BranchUncheckedCreateWithoutMaterialsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutMaterialsInput
    upsert?: BranchUpsertWithoutMaterialsInput
    disconnect?: BranchWhereInput | boolean
    delete?: BranchWhereInput | boolean
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutMaterialsInput, BranchUpdateWithoutMaterialsInput>, BranchUncheckedUpdateWithoutMaterialsInput>
  }

  export type ProductRecipeUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput> | ProductRecipeCreateWithoutMaterialInput[] | ProductRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutMaterialInput | ProductRecipeCreateOrConnectWithoutMaterialInput[]
    upsert?: ProductRecipeUpsertWithWhereUniqueWithoutMaterialInput | ProductRecipeUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ProductRecipeCreateManyMaterialInputEnvelope
    set?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    disconnect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    delete?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    update?: ProductRecipeUpdateWithWhereUniqueWithoutMaterialInput | ProductRecipeUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ProductRecipeUpdateManyWithWhereWithoutMaterialInput | ProductRecipeUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
  }

  export type ToppingRecipeUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput> | ToppingRecipeCreateWithoutMaterialInput[] | ToppingRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutMaterialInput | ToppingRecipeCreateOrConnectWithoutMaterialInput[]
    upsert?: ToppingRecipeUpsertWithWhereUniqueWithoutMaterialInput | ToppingRecipeUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ToppingRecipeCreateManyMaterialInputEnvelope
    set?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    disconnect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    delete?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    update?: ToppingRecipeUpdateWithWhereUniqueWithoutMaterialInput | ToppingRecipeUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ToppingRecipeUpdateManyWithWhereWithoutMaterialInput | ToppingRecipeUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
  }

  export type MaterialTransactionUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput> | MaterialTransactionCreateWithoutMaterialInput[] | MaterialTransactionUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: MaterialTransactionCreateOrConnectWithoutMaterialInput | MaterialTransactionCreateOrConnectWithoutMaterialInput[]
    upsert?: MaterialTransactionUpsertWithWhereUniqueWithoutMaterialInput | MaterialTransactionUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: MaterialTransactionCreateManyMaterialInputEnvelope
    set?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    disconnect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    delete?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    connect?: MaterialTransactionWhereUniqueInput | MaterialTransactionWhereUniqueInput[]
    update?: MaterialTransactionUpdateWithWhereUniqueWithoutMaterialInput | MaterialTransactionUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: MaterialTransactionUpdateManyWithWhereWithoutMaterialInput | MaterialTransactionUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: MaterialTransactionScalarWhereInput | MaterialTransactionScalarWhereInput[]
  }

  export type ProductRecipeUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput> | ProductRecipeCreateWithoutMaterialInput[] | ProductRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ProductRecipeCreateOrConnectWithoutMaterialInput | ProductRecipeCreateOrConnectWithoutMaterialInput[]
    upsert?: ProductRecipeUpsertWithWhereUniqueWithoutMaterialInput | ProductRecipeUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ProductRecipeCreateManyMaterialInputEnvelope
    set?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    disconnect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    delete?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    connect?: ProductRecipeWhereUniqueInput | ProductRecipeWhereUniqueInput[]
    update?: ProductRecipeUpdateWithWhereUniqueWithoutMaterialInput | ProductRecipeUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ProductRecipeUpdateManyWithWhereWithoutMaterialInput | ProductRecipeUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
  }

  export type ToppingRecipeUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput> | ToppingRecipeCreateWithoutMaterialInput[] | ToppingRecipeUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: ToppingRecipeCreateOrConnectWithoutMaterialInput | ToppingRecipeCreateOrConnectWithoutMaterialInput[]
    upsert?: ToppingRecipeUpsertWithWhereUniqueWithoutMaterialInput | ToppingRecipeUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: ToppingRecipeCreateManyMaterialInputEnvelope
    set?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    disconnect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    delete?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    connect?: ToppingRecipeWhereUniqueInput | ToppingRecipeWhereUniqueInput[]
    update?: ToppingRecipeUpdateWithWhereUniqueWithoutMaterialInput | ToppingRecipeUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: ToppingRecipeUpdateManyWithWhereWithoutMaterialInput | ToppingRecipeUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
  }

  export type MaterialCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<MaterialCreateWithoutTransactionsInput, MaterialUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutTransactionsInput
    connect?: MaterialWhereUniqueInput
  }

  export type MaterialUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<MaterialCreateWithoutTransactionsInput, MaterialUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutTransactionsInput
    upsert?: MaterialUpsertWithoutTransactionsInput
    connect?: MaterialWhereUniqueInput
    update?: XOR<XOR<MaterialUpdateToOneWithWhereWithoutTransactionsInput, MaterialUpdateWithoutTransactionsInput>, MaterialUncheckedUpdateWithoutTransactionsInput>
  }

  export type MaterialCreateNestedOneWithoutProduct_recipesInput = {
    create?: XOR<MaterialCreateWithoutProduct_recipesInput, MaterialUncheckedCreateWithoutProduct_recipesInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutProduct_recipesInput
    connect?: MaterialWhereUniqueInput
  }

  export type ProductVariantCreateNestedOneWithoutRecipesInput = {
    create?: XOR<ProductVariantCreateWithoutRecipesInput, ProductVariantUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutRecipesInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type MaterialUpdateOneRequiredWithoutProduct_recipesNestedInput = {
    create?: XOR<MaterialCreateWithoutProduct_recipesInput, MaterialUncheckedCreateWithoutProduct_recipesInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutProduct_recipesInput
    upsert?: MaterialUpsertWithoutProduct_recipesInput
    connect?: MaterialWhereUniqueInput
    update?: XOR<XOR<MaterialUpdateToOneWithWhereWithoutProduct_recipesInput, MaterialUpdateWithoutProduct_recipesInput>, MaterialUncheckedUpdateWithoutProduct_recipesInput>
  }

  export type ProductVariantUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<ProductVariantCreateWithoutRecipesInput, ProductVariantUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutRecipesInput
    upsert?: ProductVariantUpsertWithoutRecipesInput
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutRecipesInput, ProductVariantUpdateWithoutRecipesInput>, ProductVariantUncheckedUpdateWithoutRecipesInput>
  }

  export type MaterialCreateNestedOneWithoutTopping_recipesInput = {
    create?: XOR<MaterialCreateWithoutTopping_recipesInput, MaterialUncheckedCreateWithoutTopping_recipesInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutTopping_recipesInput
    connect?: MaterialWhereUniqueInput
  }

  export type ToppingCreateNestedOneWithoutRecipesInput = {
    create?: XOR<ToppingCreateWithoutRecipesInput, ToppingUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: ToppingCreateOrConnectWithoutRecipesInput
    connect?: ToppingWhereUniqueInput
  }

  export type MaterialUpdateOneRequiredWithoutTopping_recipesNestedInput = {
    create?: XOR<MaterialCreateWithoutTopping_recipesInput, MaterialUncheckedCreateWithoutTopping_recipesInput>
    connectOrCreate?: MaterialCreateOrConnectWithoutTopping_recipesInput
    upsert?: MaterialUpsertWithoutTopping_recipesInput
    connect?: MaterialWhereUniqueInput
    update?: XOR<XOR<MaterialUpdateToOneWithWhereWithoutTopping_recipesInput, MaterialUpdateWithoutTopping_recipesInput>, MaterialUncheckedUpdateWithoutTopping_recipesInput>
  }

  export type ToppingUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<ToppingCreateWithoutRecipesInput, ToppingUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: ToppingCreateOrConnectWithoutRecipesInput
    upsert?: ToppingUpsertWithoutRecipesInput
    connect?: ToppingWhereUniqueInput
    update?: XOR<XOR<ToppingUpdateToOneWithWhereWithoutRecipesInput, ToppingUpdateWithoutRecipesInput>, ToppingUncheckedUpdateWithoutRecipesInput>
  }

  export type OrderCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BranchCreateNestedOneWithoutTablesInput = {
    create?: XOR<BranchCreateWithoutTablesInput, BranchUncheckedCreateWithoutTablesInput>
    connectOrCreate?: BranchCreateOrConnectWithoutTablesInput
    connect?: BranchWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BranchUpdateOneWithoutTablesNestedInput = {
    create?: XOR<BranchCreateWithoutTablesInput, BranchUncheckedCreateWithoutTablesInput>
    connectOrCreate?: BranchCreateOrConnectWithoutTablesInput
    upsert?: BranchUpsertWithoutTablesInput
    disconnect?: BranchWhereInput | boolean
    delete?: BranchWhereInput | boolean
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutTablesInput, BranchUpdateWithoutTablesInput>, BranchUncheckedUpdateWithoutTablesInput>
  }

  export type OrderUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderCreateWithoutBranchInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    note?: string | null
    created_at?: Date | string
    print_count?: number
    table?: TableCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutBranchInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    table_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutBranchInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput>
  }

  export type OrderCreateManyBranchInputEnvelope = {
    data: OrderCreateManyBranchInput | OrderCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeCreateWithoutBranchInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    created_at?: Date | string
  }

  export type EmployeeUncheckedCreateWithoutBranchInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    created_at?: Date | string
  }

  export type EmployeeCreateOrConnectWithoutBranchInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput>
  }

  export type EmployeeCreateManyBranchInputEnvelope = {
    data: EmployeeCreateManyBranchInput | EmployeeCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type MaterialCreateWithoutBranchInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionCreateNestedManyWithoutMaterialInput
    product_recipes?: ProductRecipeCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateWithoutBranchInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionUncheckedCreateNestedManyWithoutMaterialInput
    product_recipes?: ProductRecipeUncheckedCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialCreateOrConnectWithoutBranchInput = {
    where: MaterialWhereUniqueInput
    create: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput>
  }

  export type MaterialCreateManyBranchInputEnvelope = {
    data: MaterialCreateManyBranchInput | MaterialCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type TableCreateWithoutBranchInput = {
    id?: string
    name: string
    area?: string
    status?: string
    orders?: OrderCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutBranchInput = {
    id?: string
    name: string
    area?: string
    status?: string
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutBranchInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput>
  }

  export type TableCreateManyBranchInputEnvelope = {
    data: TableCreateManyBranchInput | TableCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutBranchInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutBranchInput, OrderUncheckedUpdateWithoutBranchInput>
    create: XOR<OrderCreateWithoutBranchInput, OrderUncheckedCreateWithoutBranchInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutBranchInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutBranchInput, OrderUncheckedUpdateWithoutBranchInput>
  }

  export type OrderUpdateManyWithWhereWithoutBranchInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutBranchInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    order_number?: StringFilter<"Order"> | string
    total_amount?: FloatFilter<"Order"> | number
    discount_amount?: FloatFilter<"Order"> | number
    final_amount?: FloatFilter<"Order"> | number
    payment_method?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    order_type?: StringFilter<"Order"> | string
    source?: StringFilter<"Order"> | string
    branch_id?: StringNullableFilter<"Order"> | string | null
    table_id?: StringNullableFilter<"Order"> | string | null
    note?: StringNullableFilter<"Order"> | string | null
    created_at?: DateTimeFilter<"Order"> | Date | string
    print_count?: IntFilter<"Order"> | number
  }

  export type EmployeeUpsertWithWhereUniqueWithoutBranchInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutBranchInput, EmployeeUncheckedUpdateWithoutBranchInput>
    create: XOR<EmployeeCreateWithoutBranchInput, EmployeeUncheckedCreateWithoutBranchInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutBranchInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutBranchInput, EmployeeUncheckedUpdateWithoutBranchInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutBranchInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutBranchInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: StringFilter<"Employee"> | string
    username?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    position_name?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    branch_id?: StringNullableFilter<"Employee"> | string | null
    created_at?: DateTimeFilter<"Employee"> | Date | string
  }

  export type MaterialUpsertWithWhereUniqueWithoutBranchInput = {
    where: MaterialWhereUniqueInput
    update: XOR<MaterialUpdateWithoutBranchInput, MaterialUncheckedUpdateWithoutBranchInput>
    create: XOR<MaterialCreateWithoutBranchInput, MaterialUncheckedCreateWithoutBranchInput>
  }

  export type MaterialUpdateWithWhereUniqueWithoutBranchInput = {
    where: MaterialWhereUniqueInput
    data: XOR<MaterialUpdateWithoutBranchInput, MaterialUncheckedUpdateWithoutBranchInput>
  }

  export type MaterialUpdateManyWithWhereWithoutBranchInput = {
    where: MaterialScalarWhereInput
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyWithoutBranchInput>
  }

  export type MaterialScalarWhereInput = {
    AND?: MaterialScalarWhereInput | MaterialScalarWhereInput[]
    OR?: MaterialScalarWhereInput[]
    NOT?: MaterialScalarWhereInput | MaterialScalarWhereInput[]
    id?: StringFilter<"Material"> | string
    branch_id?: StringNullableFilter<"Material"> | string | null
    name?: StringFilter<"Material"> | string
    unit?: StringFilter<"Material"> | string
    cost_per_unit?: FloatFilter<"Material"> | number
    stock_current?: FloatFilter<"Material"> | number
  }

  export type TableUpsertWithWhereUniqueWithoutBranchInput = {
    where: TableWhereUniqueInput
    update: XOR<TableUpdateWithoutBranchInput, TableUncheckedUpdateWithoutBranchInput>
    create: XOR<TableCreateWithoutBranchInput, TableUncheckedCreateWithoutBranchInput>
  }

  export type TableUpdateWithWhereUniqueWithoutBranchInput = {
    where: TableWhereUniqueInput
    data: XOR<TableUpdateWithoutBranchInput, TableUncheckedUpdateWithoutBranchInput>
  }

  export type TableUpdateManyWithWhereWithoutBranchInput = {
    where: TableScalarWhereInput
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyWithoutBranchInput>
  }

  export type TableScalarWhereInput = {
    AND?: TableScalarWhereInput | TableScalarWhereInput[]
    OR?: TableScalarWhereInput[]
    NOT?: TableScalarWhereInput | TableScalarWhereInput[]
    id?: StringFilter<"Table"> | string
    branch_id?: StringNullableFilter<"Table"> | string | null
    name?: StringFilter<"Table"> | string
    area?: StringFilter<"Table"> | string
    status?: StringFilter<"Table"> | string
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingCreateNestedManyWithoutOrder_itemInput
    order: OrderCreateNestedOneWithoutItemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    order_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingUncheckedCreateNestedManyWithoutOrder_itemInput
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductVariantCreateWithoutProductInput = {
    id?: string
    size: string
    price: number
    order_items?: OrderItemCreateNestedManyWithoutVariantInput
    recipes?: ProductRecipeCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string
    size: string
    price: number
    order_items?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
    recipes?: ProductRecipeUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantCreateManyProductInputEnvelope = {
    data: ProductVariantCreateManyProductInput | ProductVariantCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    order_id?: StringFilter<"OrderItem"> | string
    product_id?: StringFilter<"OrderItem"> | string
    variant_id?: StringNullableFilter<"OrderItem"> | string | null
    quantity?: IntFilter<"OrderItem"> | number
    unit_price?: FloatFilter<"OrderItem"> | number
    subtotal?: FloatFilter<"OrderItem"> | number
    note?: StringNullableFilter<"OrderItem"> | string | null
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    OR?: ProductVariantScalarWhereInput[]
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    product_id?: StringFilter<"ProductVariant"> | string
    size?: StringFilter<"ProductVariant"> | string
    price?: FloatFilter<"ProductVariant"> | number
  }

  export type OrderItemCreateWithoutVariantInput = {
    id?: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingCreateNestedManyWithoutOrder_itemInput
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutVariantInput = {
    id?: string
    order_id: string
    product_id: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingUncheckedCreateNestedManyWithoutOrder_itemInput
  }

  export type OrderItemCreateOrConnectWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemCreateManyVariantInputEnvelope = {
    data: OrderItemCreateManyVariantInput | OrderItemCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type ProductRecipeCreateWithoutVariantInput = {
    id?: string
    quantity: number
    material: MaterialCreateNestedOneWithoutProduct_recipesInput
  }

  export type ProductRecipeUncheckedCreateWithoutVariantInput = {
    id?: string
    material_id: string
    quantity: number
  }

  export type ProductRecipeCreateOrConnectWithoutVariantInput = {
    where: ProductRecipeWhereUniqueInput
    create: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput>
  }

  export type ProductRecipeCreateManyVariantInputEnvelope = {
    data: ProductRecipeCreateManyVariantInput | ProductRecipeCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutVariantsInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    order_items?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutVariantInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type ProductRecipeUpsertWithWhereUniqueWithoutVariantInput = {
    where: ProductRecipeWhereUniqueInput
    update: XOR<ProductRecipeUpdateWithoutVariantInput, ProductRecipeUncheckedUpdateWithoutVariantInput>
    create: XOR<ProductRecipeCreateWithoutVariantInput, ProductRecipeUncheckedCreateWithoutVariantInput>
  }

  export type ProductRecipeUpdateWithWhereUniqueWithoutVariantInput = {
    where: ProductRecipeWhereUniqueInput
    data: XOR<ProductRecipeUpdateWithoutVariantInput, ProductRecipeUncheckedUpdateWithoutVariantInput>
  }

  export type ProductRecipeUpdateManyWithWhereWithoutVariantInput = {
    where: ProductRecipeScalarWhereInput
    data: XOR<ProductRecipeUpdateManyMutationInput, ProductRecipeUncheckedUpdateManyWithoutVariantInput>
  }

  export type ProductRecipeScalarWhereInput = {
    AND?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
    OR?: ProductRecipeScalarWhereInput[]
    NOT?: ProductRecipeScalarWhereInput | ProductRecipeScalarWhereInput[]
    id?: StringFilter<"ProductRecipe"> | string
    variant_id?: StringFilter<"ProductRecipe"> | string
    material_id?: StringFilter<"ProductRecipe"> | string
    quantity?: FloatFilter<"ProductRecipe"> | number
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    order_items?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    order_items?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderItemToppingCreateWithoutToppingInput = {
    id?: string
    name: string
    price: number
    order_item: OrderItemCreateNestedOneWithoutToppingsInput
  }

  export type OrderItemToppingUncheckedCreateWithoutToppingInput = {
    id?: string
    order_item_id: string
    name: string
    price: number
  }

  export type OrderItemToppingCreateOrConnectWithoutToppingInput = {
    where: OrderItemToppingWhereUniqueInput
    create: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput>
  }

  export type OrderItemToppingCreateManyToppingInputEnvelope = {
    data: OrderItemToppingCreateManyToppingInput | OrderItemToppingCreateManyToppingInput[]
    skipDuplicates?: boolean
  }

  export type ToppingRecipeCreateWithoutToppingInput = {
    id?: string
    quantity: number
    material: MaterialCreateNestedOneWithoutTopping_recipesInput
  }

  export type ToppingRecipeUncheckedCreateWithoutToppingInput = {
    id?: string
    material_id: string
    quantity: number
  }

  export type ToppingRecipeCreateOrConnectWithoutToppingInput = {
    where: ToppingRecipeWhereUniqueInput
    create: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput>
  }

  export type ToppingRecipeCreateManyToppingInputEnvelope = {
    data: ToppingRecipeCreateManyToppingInput | ToppingRecipeCreateManyToppingInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemToppingUpsertWithWhereUniqueWithoutToppingInput = {
    where: OrderItemToppingWhereUniqueInput
    update: XOR<OrderItemToppingUpdateWithoutToppingInput, OrderItemToppingUncheckedUpdateWithoutToppingInput>
    create: XOR<OrderItemToppingCreateWithoutToppingInput, OrderItemToppingUncheckedCreateWithoutToppingInput>
  }

  export type OrderItemToppingUpdateWithWhereUniqueWithoutToppingInput = {
    where: OrderItemToppingWhereUniqueInput
    data: XOR<OrderItemToppingUpdateWithoutToppingInput, OrderItemToppingUncheckedUpdateWithoutToppingInput>
  }

  export type OrderItemToppingUpdateManyWithWhereWithoutToppingInput = {
    where: OrderItemToppingScalarWhereInput
    data: XOR<OrderItemToppingUpdateManyMutationInput, OrderItemToppingUncheckedUpdateManyWithoutToppingInput>
  }

  export type OrderItemToppingScalarWhereInput = {
    AND?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
    OR?: OrderItemToppingScalarWhereInput[]
    NOT?: OrderItemToppingScalarWhereInput | OrderItemToppingScalarWhereInput[]
    id?: StringFilter<"OrderItemTopping"> | string
    order_item_id?: StringFilter<"OrderItemTopping"> | string
    topping_id?: StringFilter<"OrderItemTopping"> | string
    name?: StringFilter<"OrderItemTopping"> | string
    price?: FloatFilter<"OrderItemTopping"> | number
  }

  export type ToppingRecipeUpsertWithWhereUniqueWithoutToppingInput = {
    where: ToppingRecipeWhereUniqueInput
    update: XOR<ToppingRecipeUpdateWithoutToppingInput, ToppingRecipeUncheckedUpdateWithoutToppingInput>
    create: XOR<ToppingRecipeCreateWithoutToppingInput, ToppingRecipeUncheckedCreateWithoutToppingInput>
  }

  export type ToppingRecipeUpdateWithWhereUniqueWithoutToppingInput = {
    where: ToppingRecipeWhereUniqueInput
    data: XOR<ToppingRecipeUpdateWithoutToppingInput, ToppingRecipeUncheckedUpdateWithoutToppingInput>
  }

  export type ToppingRecipeUpdateManyWithWhereWithoutToppingInput = {
    where: ToppingRecipeScalarWhereInput
    data: XOR<ToppingRecipeUpdateManyMutationInput, ToppingRecipeUncheckedUpdateManyWithoutToppingInput>
  }

  export type ToppingRecipeScalarWhereInput = {
    AND?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
    OR?: ToppingRecipeScalarWhereInput[]
    NOT?: ToppingRecipeScalarWhereInput | ToppingRecipeScalarWhereInput[]
    id?: StringFilter<"ToppingRecipe"> | string
    topping_id?: StringFilter<"ToppingRecipe"> | string
    material_id?: StringFilter<"ToppingRecipe"> | string
    quantity?: FloatFilter<"ToppingRecipe"> | number
  }

  export type BranchCreateWithoutEmployeesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderCreateNestedManyWithoutBranchInput
    materials?: MaterialCreateNestedManyWithoutBranchInput
    tables?: TableCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBranchInput
    materials?: MaterialUncheckedCreateNestedManyWithoutBranchInput
    tables?: TableUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutEmployeesInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutEmployeesInput, BranchUncheckedCreateWithoutEmployeesInput>
  }

  export type BranchUpsertWithoutEmployeesInput = {
    update: XOR<BranchUpdateWithoutEmployeesInput, BranchUncheckedUpdateWithoutEmployeesInput>
    create: XOR<BranchCreateWithoutEmployeesInput, BranchUncheckedCreateWithoutEmployeesInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutEmployeesInput, BranchUncheckedUpdateWithoutEmployeesInput>
  }

  export type BranchUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBranchNestedInput
    materials?: MaterialUpdateManyWithoutBranchNestedInput
    tables?: TableUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBranchNestedInput
    materials?: MaterialUncheckedUpdateManyWithoutBranchNestedInput
    tables?: TableUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateWithoutOrdersInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    employees?: EmployeeCreateNestedManyWithoutBranchInput
    materials?: MaterialCreateNestedManyWithoutBranchInput
    tables?: TableCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutBranchInput
    materials?: MaterialUncheckedCreateNestedManyWithoutBranchInput
    tables?: TableUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutOrdersInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutOrdersInput, BranchUncheckedCreateWithoutOrdersInput>
  }

  export type TableCreateWithoutOrdersInput = {
    id?: string
    name: string
    area?: string
    status?: string
    branch?: BranchCreateNestedOneWithoutTablesInput
  }

  export type TableUncheckedCreateWithoutOrdersInput = {
    id?: string
    branch_id?: string | null
    name: string
    area?: string
    status?: string
  }

  export type TableCreateOrConnectWithoutOrdersInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingCreateNestedManyWithoutOrder_itemInput
    product: ProductCreateNestedOneWithoutOrder_itemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    product_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    toppings?: OrderItemToppingUncheckedCreateNestedManyWithoutOrder_itemInput
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type BranchUpsertWithoutOrdersInput = {
    update: XOR<BranchUpdateWithoutOrdersInput, BranchUncheckedUpdateWithoutOrdersInput>
    create: XOR<BranchCreateWithoutOrdersInput, BranchUncheckedCreateWithoutOrdersInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutOrdersInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutOrdersInput, BranchUncheckedUpdateWithoutOrdersInput>
  }

  export type BranchUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutBranchNestedInput
    materials?: MaterialUpdateManyWithoutBranchNestedInput
    tables?: TableUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutBranchNestedInput
    materials?: MaterialUncheckedUpdateManyWithoutBranchNestedInput
    tables?: TableUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type TableUpsertWithoutOrdersInput = {
    update: XOR<TableUpdateWithoutOrdersInput, TableUncheckedUpdateWithoutOrdersInput>
    create: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    where?: TableWhereInput
  }

  export type TableUpdateToOneWithWhereWithoutOrdersInput = {
    where?: TableWhereInput
    data: XOR<TableUpdateWithoutOrdersInput, TableUncheckedUpdateWithoutOrdersInput>
  }

  export type TableUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    branch?: BranchUpdateOneWithoutTablesNestedInput
  }

  export type TableUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemToppingCreateWithoutOrder_itemInput = {
    id?: string
    name: string
    price: number
    topping: ToppingCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemToppingUncheckedCreateWithoutOrder_itemInput = {
    id?: string
    topping_id: string
    name: string
    price: number
  }

  export type OrderItemToppingCreateOrConnectWithoutOrder_itemInput = {
    where: OrderItemToppingWhereUniqueInput
    create: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput>
  }

  export type OrderItemToppingCreateManyOrder_itemInputEnvelope = {
    data: OrderItemToppingCreateManyOrder_itemInput | OrderItemToppingCreateManyOrder_itemInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    note?: string | null
    created_at?: Date | string
    print_count?: number
    branch?: BranchCreateNestedOneWithoutOrdersInput
    table?: TableCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    branch_id?: string | null
    table_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrder_itemsInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrder_itemsInput = {
    id?: string
    name_vi: string
    name_en: string
    category: string
    available?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrder_itemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
  }

  export type ProductVariantCreateWithoutOrder_itemsInput = {
    id?: string
    size: string
    price: number
    recipes?: ProductRecipeCreateNestedManyWithoutVariantInput
    product: ProductCreateNestedOneWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateWithoutOrder_itemsInput = {
    id?: string
    product_id: string
    size: string
    price: number
    recipes?: ProductRecipeUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutOrder_itemsInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutOrder_itemsInput, ProductVariantUncheckedCreateWithoutOrder_itemsInput>
  }

  export type OrderItemToppingUpsertWithWhereUniqueWithoutOrder_itemInput = {
    where: OrderItemToppingWhereUniqueInput
    update: XOR<OrderItemToppingUpdateWithoutOrder_itemInput, OrderItemToppingUncheckedUpdateWithoutOrder_itemInput>
    create: XOR<OrderItemToppingCreateWithoutOrder_itemInput, OrderItemToppingUncheckedCreateWithoutOrder_itemInput>
  }

  export type OrderItemToppingUpdateWithWhereUniqueWithoutOrder_itemInput = {
    where: OrderItemToppingWhereUniqueInput
    data: XOR<OrderItemToppingUpdateWithoutOrder_itemInput, OrderItemToppingUncheckedUpdateWithoutOrder_itemInput>
  }

  export type OrderItemToppingUpdateManyWithWhereWithoutOrder_itemInput = {
    where: OrderItemToppingScalarWhereInput
    data: XOR<OrderItemToppingUpdateManyMutationInput, OrderItemToppingUncheckedUpdateManyWithoutOrder_itemInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    branch?: BranchUpdateOneWithoutOrdersNestedInput
    table?: TableUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    table_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUpsertWithoutOrder_itemsInput = {
    update: XOR<ProductUpdateWithoutOrder_itemsInput, ProductUncheckedUpdateWithoutOrder_itemsInput>
    create: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrder_itemsInput, ProductUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ProductUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_vi?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductVariantUpsertWithoutOrder_itemsInput = {
    update: XOR<ProductVariantUpdateWithoutOrder_itemsInput, ProductVariantUncheckedUpdateWithoutOrder_itemsInput>
    create: XOR<ProductVariantCreateWithoutOrder_itemsInput, ProductVariantUncheckedCreateWithoutOrder_itemsInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutOrder_itemsInput, ProductVariantUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ProductVariantUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    recipes?: ProductRecipeUpdateManyWithoutVariantNestedInput
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    recipes?: ProductRecipeUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type OrderItemCreateWithoutToppingsInput = {
    id?: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrder_itemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutToppingsInput = {
    id?: string
    order_id: string
    product_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
  }

  export type OrderItemCreateOrConnectWithoutToppingsInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutToppingsInput, OrderItemUncheckedCreateWithoutToppingsInput>
  }

  export type ToppingCreateWithoutOrder_itemsInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    recipes?: ToppingRecipeCreateNestedManyWithoutToppingInput
  }

  export type ToppingUncheckedCreateWithoutOrder_itemsInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutToppingInput
  }

  export type ToppingCreateOrConnectWithoutOrder_itemsInput = {
    where: ToppingWhereUniqueInput
    create: XOR<ToppingCreateWithoutOrder_itemsInput, ToppingUncheckedCreateWithoutOrder_itemsInput>
  }

  export type OrderItemUpsertWithoutToppingsInput = {
    update: XOR<OrderItemUpdateWithoutToppingsInput, OrderItemUncheckedUpdateWithoutToppingsInput>
    create: XOR<OrderItemCreateWithoutToppingsInput, OrderItemUncheckedCreateWithoutToppingsInput>
    where?: OrderItemWhereInput
  }

  export type OrderItemUpdateToOneWithWhereWithoutToppingsInput = {
    where?: OrderItemWhereInput
    data: XOR<OrderItemUpdateWithoutToppingsInput, OrderItemUncheckedUpdateWithoutToppingsInput>
  }

  export type OrderItemUpdateWithoutToppingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutToppingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ToppingUpsertWithoutOrder_itemsInput = {
    update: XOR<ToppingUpdateWithoutOrder_itemsInput, ToppingUncheckedUpdateWithoutOrder_itemsInput>
    create: XOR<ToppingCreateWithoutOrder_itemsInput, ToppingUncheckedCreateWithoutOrder_itemsInput>
    where?: ToppingWhereInput
  }

  export type ToppingUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: ToppingWhereInput
    data: XOR<ToppingUpdateWithoutOrder_itemsInput, ToppingUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ToppingUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    recipes?: ToppingRecipeUpdateManyWithoutToppingNestedInput
  }

  export type ToppingUncheckedUpdateWithoutOrder_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    recipes?: ToppingRecipeUncheckedUpdateManyWithoutToppingNestedInput
  }

  export type MaterialTransactionCreateWithoutMaterialInput = {
    id?: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
  }

  export type MaterialTransactionUncheckedCreateWithoutMaterialInput = {
    id?: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
  }

  export type MaterialTransactionCreateOrConnectWithoutMaterialInput = {
    where: MaterialTransactionWhereUniqueInput
    create: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput>
  }

  export type MaterialTransactionCreateManyMaterialInputEnvelope = {
    data: MaterialTransactionCreateManyMaterialInput | MaterialTransactionCreateManyMaterialInput[]
    skipDuplicates?: boolean
  }

  export type BranchCreateWithoutMaterialsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderCreateNestedManyWithoutBranchInput
    employees?: EmployeeCreateNestedManyWithoutBranchInput
    tables?: TableCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutMaterialsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBranchInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBranchInput
    tables?: TableUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutMaterialsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutMaterialsInput, BranchUncheckedCreateWithoutMaterialsInput>
  }

  export type ProductRecipeCreateWithoutMaterialInput = {
    id?: string
    quantity: number
    variant: ProductVariantCreateNestedOneWithoutRecipesInput
  }

  export type ProductRecipeUncheckedCreateWithoutMaterialInput = {
    id?: string
    variant_id: string
    quantity: number
  }

  export type ProductRecipeCreateOrConnectWithoutMaterialInput = {
    where: ProductRecipeWhereUniqueInput
    create: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput>
  }

  export type ProductRecipeCreateManyMaterialInputEnvelope = {
    data: ProductRecipeCreateManyMaterialInput | ProductRecipeCreateManyMaterialInput[]
    skipDuplicates?: boolean
  }

  export type ToppingRecipeCreateWithoutMaterialInput = {
    id?: string
    quantity: number
    topping: ToppingCreateNestedOneWithoutRecipesInput
  }

  export type ToppingRecipeUncheckedCreateWithoutMaterialInput = {
    id?: string
    topping_id: string
    quantity: number
  }

  export type ToppingRecipeCreateOrConnectWithoutMaterialInput = {
    where: ToppingRecipeWhereUniqueInput
    create: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput>
  }

  export type ToppingRecipeCreateManyMaterialInputEnvelope = {
    data: ToppingRecipeCreateManyMaterialInput | ToppingRecipeCreateManyMaterialInput[]
    skipDuplicates?: boolean
  }

  export type MaterialTransactionUpsertWithWhereUniqueWithoutMaterialInput = {
    where: MaterialTransactionWhereUniqueInput
    update: XOR<MaterialTransactionUpdateWithoutMaterialInput, MaterialTransactionUncheckedUpdateWithoutMaterialInput>
    create: XOR<MaterialTransactionCreateWithoutMaterialInput, MaterialTransactionUncheckedCreateWithoutMaterialInput>
  }

  export type MaterialTransactionUpdateWithWhereUniqueWithoutMaterialInput = {
    where: MaterialTransactionWhereUniqueInput
    data: XOR<MaterialTransactionUpdateWithoutMaterialInput, MaterialTransactionUncheckedUpdateWithoutMaterialInput>
  }

  export type MaterialTransactionUpdateManyWithWhereWithoutMaterialInput = {
    where: MaterialTransactionScalarWhereInput
    data: XOR<MaterialTransactionUpdateManyMutationInput, MaterialTransactionUncheckedUpdateManyWithoutMaterialInput>
  }

  export type MaterialTransactionScalarWhereInput = {
    AND?: MaterialTransactionScalarWhereInput | MaterialTransactionScalarWhereInput[]
    OR?: MaterialTransactionScalarWhereInput[]
    NOT?: MaterialTransactionScalarWhereInput | MaterialTransactionScalarWhereInput[]
    id?: StringFilter<"MaterialTransaction"> | string
    material_id?: StringFilter<"MaterialTransaction"> | string
    type?: StringFilter<"MaterialTransaction"> | string
    quantity?: FloatFilter<"MaterialTransaction"> | number
    note?: StringNullableFilter<"MaterialTransaction"> | string | null
    created_at?: DateTimeFilter<"MaterialTransaction"> | Date | string
  }

  export type BranchUpsertWithoutMaterialsInput = {
    update: XOR<BranchUpdateWithoutMaterialsInput, BranchUncheckedUpdateWithoutMaterialsInput>
    create: XOR<BranchCreateWithoutMaterialsInput, BranchUncheckedCreateWithoutMaterialsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutMaterialsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutMaterialsInput, BranchUncheckedUpdateWithoutMaterialsInput>
  }

  export type BranchUpdateWithoutMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUpdateManyWithoutBranchNestedInput
    tables?: TableUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBranchNestedInput
    tables?: TableUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type ProductRecipeUpsertWithWhereUniqueWithoutMaterialInput = {
    where: ProductRecipeWhereUniqueInput
    update: XOR<ProductRecipeUpdateWithoutMaterialInput, ProductRecipeUncheckedUpdateWithoutMaterialInput>
    create: XOR<ProductRecipeCreateWithoutMaterialInput, ProductRecipeUncheckedCreateWithoutMaterialInput>
  }

  export type ProductRecipeUpdateWithWhereUniqueWithoutMaterialInput = {
    where: ProductRecipeWhereUniqueInput
    data: XOR<ProductRecipeUpdateWithoutMaterialInput, ProductRecipeUncheckedUpdateWithoutMaterialInput>
  }

  export type ProductRecipeUpdateManyWithWhereWithoutMaterialInput = {
    where: ProductRecipeScalarWhereInput
    data: XOR<ProductRecipeUpdateManyMutationInput, ProductRecipeUncheckedUpdateManyWithoutMaterialInput>
  }

  export type ToppingRecipeUpsertWithWhereUniqueWithoutMaterialInput = {
    where: ToppingRecipeWhereUniqueInput
    update: XOR<ToppingRecipeUpdateWithoutMaterialInput, ToppingRecipeUncheckedUpdateWithoutMaterialInput>
    create: XOR<ToppingRecipeCreateWithoutMaterialInput, ToppingRecipeUncheckedCreateWithoutMaterialInput>
  }

  export type ToppingRecipeUpdateWithWhereUniqueWithoutMaterialInput = {
    where: ToppingRecipeWhereUniqueInput
    data: XOR<ToppingRecipeUpdateWithoutMaterialInput, ToppingRecipeUncheckedUpdateWithoutMaterialInput>
  }

  export type ToppingRecipeUpdateManyWithWhereWithoutMaterialInput = {
    where: ToppingRecipeScalarWhereInput
    data: XOR<ToppingRecipeUpdateManyMutationInput, ToppingRecipeUncheckedUpdateManyWithoutMaterialInput>
  }

  export type MaterialCreateWithoutTransactionsInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    branch?: BranchCreateNestedOneWithoutMaterialsInput
    product_recipes?: ProductRecipeCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateWithoutTransactionsInput = {
    id?: string
    branch_id?: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    product_recipes?: ProductRecipeUncheckedCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialCreateOrConnectWithoutTransactionsInput = {
    where: MaterialWhereUniqueInput
    create: XOR<MaterialCreateWithoutTransactionsInput, MaterialUncheckedCreateWithoutTransactionsInput>
  }

  export type MaterialUpsertWithoutTransactionsInput = {
    update: XOR<MaterialUpdateWithoutTransactionsInput, MaterialUncheckedUpdateWithoutTransactionsInput>
    create: XOR<MaterialCreateWithoutTransactionsInput, MaterialUncheckedCreateWithoutTransactionsInput>
    where?: MaterialWhereInput
  }

  export type MaterialUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: MaterialWhereInput
    data: XOR<MaterialUpdateWithoutTransactionsInput, MaterialUncheckedUpdateWithoutTransactionsInput>
  }

  export type MaterialUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    branch?: BranchUpdateOneWithoutMaterialsNestedInput
    product_recipes?: ProductRecipeUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    product_recipes?: ProductRecipeUncheckedUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialCreateWithoutProduct_recipesInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionCreateNestedManyWithoutMaterialInput
    branch?: BranchCreateNestedOneWithoutMaterialsInput
    topping_recipes?: ToppingRecipeCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateWithoutProduct_recipesInput = {
    id?: string
    branch_id?: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionUncheckedCreateNestedManyWithoutMaterialInput
    topping_recipes?: ToppingRecipeUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialCreateOrConnectWithoutProduct_recipesInput = {
    where: MaterialWhereUniqueInput
    create: XOR<MaterialCreateWithoutProduct_recipesInput, MaterialUncheckedCreateWithoutProduct_recipesInput>
  }

  export type ProductVariantCreateWithoutRecipesInput = {
    id?: string
    size: string
    price: number
    order_items?: OrderItemCreateNestedManyWithoutVariantInput
    product: ProductCreateNestedOneWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateWithoutRecipesInput = {
    id?: string
    product_id: string
    size: string
    price: number
    order_items?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutRecipesInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutRecipesInput, ProductVariantUncheckedCreateWithoutRecipesInput>
  }

  export type MaterialUpsertWithoutProduct_recipesInput = {
    update: XOR<MaterialUpdateWithoutProduct_recipesInput, MaterialUncheckedUpdateWithoutProduct_recipesInput>
    create: XOR<MaterialCreateWithoutProduct_recipesInput, MaterialUncheckedCreateWithoutProduct_recipesInput>
    where?: MaterialWhereInput
  }

  export type MaterialUpdateToOneWithWhereWithoutProduct_recipesInput = {
    where?: MaterialWhereInput
    data: XOR<MaterialUpdateWithoutProduct_recipesInput, MaterialUncheckedUpdateWithoutProduct_recipesInput>
  }

  export type MaterialUpdateWithoutProduct_recipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUpdateManyWithoutMaterialNestedInput
    branch?: BranchUpdateOneWithoutMaterialsNestedInput
    topping_recipes?: ToppingRecipeUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateWithoutProduct_recipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUncheckedUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type ProductVariantUpsertWithoutRecipesInput = {
    update: XOR<ProductVariantUpdateWithoutRecipesInput, ProductVariantUncheckedUpdateWithoutRecipesInput>
    create: XOR<ProductVariantCreateWithoutRecipesInput, ProductVariantUncheckedCreateWithoutRecipesInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutRecipesInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutRecipesInput, ProductVariantUncheckedUpdateWithoutRecipesInput>
  }

  export type ProductVariantUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUpdateManyWithoutVariantNestedInput
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type MaterialCreateWithoutTopping_recipesInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionCreateNestedManyWithoutMaterialInput
    branch?: BranchCreateNestedOneWithoutMaterialsInput
    product_recipes?: ProductRecipeCreateNestedManyWithoutMaterialInput
  }

  export type MaterialUncheckedCreateWithoutTopping_recipesInput = {
    id?: string
    branch_id?: string | null
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
    transactions?: MaterialTransactionUncheckedCreateNestedManyWithoutMaterialInput
    product_recipes?: ProductRecipeUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type MaterialCreateOrConnectWithoutTopping_recipesInput = {
    where: MaterialWhereUniqueInput
    create: XOR<MaterialCreateWithoutTopping_recipesInput, MaterialUncheckedCreateWithoutTopping_recipesInput>
  }

  export type ToppingCreateWithoutRecipesInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    order_items?: OrderItemToppingCreateNestedManyWithoutToppingInput
  }

  export type ToppingUncheckedCreateWithoutRecipesInput = {
    id?: string
    name: string
    price: number
    available?: boolean
    order_items?: OrderItemToppingUncheckedCreateNestedManyWithoutToppingInput
  }

  export type ToppingCreateOrConnectWithoutRecipesInput = {
    where: ToppingWhereUniqueInput
    create: XOR<ToppingCreateWithoutRecipesInput, ToppingUncheckedCreateWithoutRecipesInput>
  }

  export type MaterialUpsertWithoutTopping_recipesInput = {
    update: XOR<MaterialUpdateWithoutTopping_recipesInput, MaterialUncheckedUpdateWithoutTopping_recipesInput>
    create: XOR<MaterialCreateWithoutTopping_recipesInput, MaterialUncheckedCreateWithoutTopping_recipesInput>
    where?: MaterialWhereInput
  }

  export type MaterialUpdateToOneWithWhereWithoutTopping_recipesInput = {
    where?: MaterialWhereInput
    data: XOR<MaterialUpdateWithoutTopping_recipesInput, MaterialUncheckedUpdateWithoutTopping_recipesInput>
  }

  export type MaterialUpdateWithoutTopping_recipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUpdateManyWithoutMaterialNestedInput
    branch?: BranchUpdateOneWithoutMaterialsNestedInput
    product_recipes?: ProductRecipeUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateWithoutTopping_recipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUncheckedUpdateManyWithoutMaterialNestedInput
    product_recipes?: ProductRecipeUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type ToppingUpsertWithoutRecipesInput = {
    update: XOR<ToppingUpdateWithoutRecipesInput, ToppingUncheckedUpdateWithoutRecipesInput>
    create: XOR<ToppingCreateWithoutRecipesInput, ToppingUncheckedCreateWithoutRecipesInput>
    where?: ToppingWhereInput
  }

  export type ToppingUpdateToOneWithWhereWithoutRecipesInput = {
    where?: ToppingWhereInput
    data: XOR<ToppingUpdateWithoutRecipesInput, ToppingUncheckedUpdateWithoutRecipesInput>
  }

  export type ToppingUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    order_items?: OrderItemToppingUpdateManyWithoutToppingNestedInput
  }

  export type ToppingUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    available?: BoolFieldUpdateOperationsInput | boolean
    order_items?: OrderItemToppingUncheckedUpdateManyWithoutToppingNestedInput
  }

  export type OrderCreateWithoutTableInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    note?: string | null
    created_at?: Date | string
    print_count?: number
    branch?: BranchCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTableInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    branch_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTableInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderCreateManyTableInputEnvelope = {
    data: OrderCreateManyTableInput | OrderCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type BranchCreateWithoutTablesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderCreateNestedManyWithoutBranchInput
    employees?: EmployeeCreateNestedManyWithoutBranchInput
    materials?: MaterialCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutTablesInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    created_at?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBranchInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBranchInput
    materials?: MaterialUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutTablesInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutTablesInput, BranchUncheckedCreateWithoutTablesInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
  }

  export type OrderUpdateManyWithWhereWithoutTableInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutTableInput>
  }

  export type BranchUpsertWithoutTablesInput = {
    update: XOR<BranchUpdateWithoutTablesInput, BranchUncheckedUpdateWithoutTablesInput>
    create: XOR<BranchCreateWithoutTablesInput, BranchUncheckedCreateWithoutTablesInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutTablesInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutTablesInput, BranchUncheckedUpdateWithoutTablesInput>
  }

  export type BranchUpdateWithoutTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUpdateManyWithoutBranchNestedInput
    materials?: MaterialUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutTablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBranchNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBranchNestedInput
    materials?: MaterialUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type OrderCreateManyBranchInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    table_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
  }

  export type EmployeeCreateManyBranchInput = {
    id?: string
    username: string
    password: string
    name: string
    position_name: string
    role?: string
    created_at?: Date | string
  }

  export type MaterialCreateManyBranchInput = {
    id?: string
    name: string
    unit: string
    cost_per_unit: number
    stock_current?: number
  }

  export type TableCreateManyBranchInput = {
    id?: string
    name: string
    area?: string
    status?: string
  }

  export type OrderUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    table?: TableUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    table_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    table_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
  }

  export type EmployeeUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    position_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUpdateManyWithoutMaterialNestedInput
    product_recipes?: ProductRecipeUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
    transactions?: MaterialTransactionUncheckedUpdateManyWithoutMaterialNestedInput
    product_recipes?: ProductRecipeUncheckedUpdateManyWithoutMaterialNestedInput
    topping_recipes?: ToppingRecipeUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type MaterialUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    cost_per_unit?: FloatFieldUpdateOperationsInput | number
    stock_current?: FloatFieldUpdateOperationsInput | number
  }

  export type TableUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    orders?: OrderUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    order_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
  }

  export type ProductVariantCreateManyProductInput = {
    id?: string
    size: string
    price: number
  }

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUpdateManyWithoutOrder_itemNestedInput
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUncheckedUpdateManyWithoutOrder_itemNestedInput
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUpdateManyWithoutVariantNestedInput
    recipes?: ProductRecipeUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_items?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
    recipes?: ProductRecipeUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyVariantInput = {
    id?: string
    order_id: string
    product_id: string
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
  }

  export type ProductRecipeCreateManyVariantInput = {
    id?: string
    material_id: string
    quantity: number
  }

  export type OrderItemUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUpdateManyWithoutOrder_itemNestedInput
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUncheckedUpdateManyWithoutOrder_itemNestedInput
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductRecipeUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    material?: MaterialUpdateOneRequiredWithoutProduct_recipesNestedInput
  }

  export type ProductRecipeUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductRecipeUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemToppingCreateManyToppingInput = {
    id?: string
    order_item_id: string
    name: string
    price: number
  }

  export type ToppingRecipeCreateManyToppingInput = {
    id?: string
    material_id: string
    quantity: number
  }

  export type OrderItemToppingUpdateWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    order_item?: OrderItemUpdateOneRequiredWithoutToppingsNestedInput
  }

  export type OrderItemToppingUncheckedUpdateWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemToppingUncheckedUpdateManyWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeUpdateWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    material?: MaterialUpdateOneRequiredWithoutTopping_recipesNestedInput
  }

  export type ToppingRecipeUncheckedUpdateWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeUncheckedUpdateManyWithoutToppingInput = {
    id?: StringFieldUpdateOperationsInput | string
    material_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    product_id: string
    variant_id?: string | null
    quantity: number
    unit_price: number
    subtotal: number
    note?: string | null
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUpdateManyWithoutOrder_itemNestedInput
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    toppings?: OrderItemToppingUncheckedUpdateManyWithoutOrder_itemNestedInput
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    variant_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    unit_price?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemToppingCreateManyOrder_itemInput = {
    id?: string
    topping_id: string
    name: string
    price: number
  }

  export type OrderItemToppingUpdateWithoutOrder_itemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    topping?: ToppingUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemToppingUncheckedUpdateWithoutOrder_itemInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemToppingUncheckedUpdateManyWithoutOrder_itemInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type MaterialTransactionCreateManyMaterialInput = {
    id?: string
    type: string
    quantity: number
    note?: string | null
    created_at?: Date | string
  }

  export type ProductRecipeCreateManyMaterialInput = {
    id?: string
    variant_id: string
    quantity: number
  }

  export type ToppingRecipeCreateManyMaterialInput = {
    id?: string
    topping_id: string
    quantity: number
  }

  export type MaterialTransactionUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTransactionUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialTransactionUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRecipeUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    variant?: ProductVariantUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type ProductRecipeUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    variant_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductRecipeUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    variant_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    topping?: ToppingUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type ToppingRecipeUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type ToppingRecipeUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    topping_id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderCreateManyTableInput = {
    id?: string
    order_number: string
    total_amount: number
    discount_amount?: number
    final_amount: number
    payment_method?: string
    status?: string
    order_type?: string
    source?: string
    branch_id?: string | null
    note?: string | null
    created_at?: Date | string
    print_count?: number
  }

  export type OrderUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    branch?: BranchUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutTableInput = {
    id?: StringFieldUpdateOperationsInput | string
    order_number?: StringFieldUpdateOperationsInput | string
    total_amount?: FloatFieldUpdateOperationsInput | number
    discount_amount?: FloatFieldUpdateOperationsInput | number
    final_amount?: FloatFieldUpdateOperationsInput | number
    payment_method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    order_type?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    branch_id?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    print_count?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}