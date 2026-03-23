import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserLocationModel = runtime.Types.Result.DefaultSelection<Prisma.$UserLocationPayload>;
export type AggregateUserLocation = {
    _count: UserLocationCountAggregateOutputType | null;
    _avg: UserLocationAvgAggregateOutputType | null;
    _sum: UserLocationSumAggregateOutputType | null;
    _min: UserLocationMinAggregateOutputType | null;
    _max: UserLocationMaxAggregateOutputType | null;
};
export type UserLocationAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    locationId: number | null;
};
export type UserLocationSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    locationId: number | null;
};
export type UserLocationMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    locationId: number | null;
};
export type UserLocationMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    locationId: number | null;
};
export type UserLocationCountAggregateOutputType = {
    id: number;
    userId: number;
    locationId: number;
    _all: number;
};
export type UserLocationAvgAggregateInputType = {
    id?: true;
    userId?: true;
    locationId?: true;
};
export type UserLocationSumAggregateInputType = {
    id?: true;
    userId?: true;
    locationId?: true;
};
export type UserLocationMinAggregateInputType = {
    id?: true;
    userId?: true;
    locationId?: true;
};
export type UserLocationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    locationId?: true;
};
export type UserLocationCountAggregateInputType = {
    id?: true;
    userId?: true;
    locationId?: true;
    _all?: true;
};
export type UserLocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserLocationWhereInput;
    orderBy?: Prisma.UserLocationOrderByWithRelationInput | Prisma.UserLocationOrderByWithRelationInput[];
    cursor?: Prisma.UserLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserLocationCountAggregateInputType;
    _avg?: UserLocationAvgAggregateInputType;
    _sum?: UserLocationSumAggregateInputType;
    _min?: UserLocationMinAggregateInputType;
    _max?: UserLocationMaxAggregateInputType;
};
export type GetUserLocationAggregateType<T extends UserLocationAggregateArgs> = {
    [P in keyof T & keyof AggregateUserLocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserLocation[P]> : Prisma.GetScalarType<T[P], AggregateUserLocation[P]>;
};
export type UserLocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserLocationWhereInput;
    orderBy?: Prisma.UserLocationOrderByWithAggregationInput | Prisma.UserLocationOrderByWithAggregationInput[];
    by: Prisma.UserLocationScalarFieldEnum[] | Prisma.UserLocationScalarFieldEnum;
    having?: Prisma.UserLocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserLocationCountAggregateInputType | true;
    _avg?: UserLocationAvgAggregateInputType;
    _sum?: UserLocationSumAggregateInputType;
    _min?: UserLocationMinAggregateInputType;
    _max?: UserLocationMaxAggregateInputType;
};
export type UserLocationGroupByOutputType = {
    id: number;
    userId: number;
    locationId: number;
    _count: UserLocationCountAggregateOutputType | null;
    _avg: UserLocationAvgAggregateOutputType | null;
    _sum: UserLocationSumAggregateOutputType | null;
    _min: UserLocationMinAggregateOutputType | null;
    _max: UserLocationMaxAggregateOutputType | null;
};
type GetUserLocationGroupByPayload<T extends UserLocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserLocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserLocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserLocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserLocationGroupByOutputType[P]>;
}>>;
export type UserLocationWhereInput = {
    AND?: Prisma.UserLocationWhereInput | Prisma.UserLocationWhereInput[];
    OR?: Prisma.UserLocationWhereInput[];
    NOT?: Prisma.UserLocationWhereInput | Prisma.UserLocationWhereInput[];
    id?: Prisma.IntFilter<"UserLocation"> | number;
    userId?: Prisma.IntFilter<"UserLocation"> | number;
    locationId?: Prisma.IntFilter<"UserLocation"> | number;
};
export type UserLocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.UserLocationWhereInput | Prisma.UserLocationWhereInput[];
    OR?: Prisma.UserLocationWhereInput[];
    NOT?: Prisma.UserLocationWhereInput | Prisma.UserLocationWhereInput[];
    userId?: Prisma.IntFilter<"UserLocation"> | number;
    locationId?: Prisma.IntFilter<"UserLocation"> | number;
}, "id">;
export type UserLocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    _count?: Prisma.UserLocationCountOrderByAggregateInput;
    _avg?: Prisma.UserLocationAvgOrderByAggregateInput;
    _max?: Prisma.UserLocationMaxOrderByAggregateInput;
    _min?: Prisma.UserLocationMinOrderByAggregateInput;
    _sum?: Prisma.UserLocationSumOrderByAggregateInput;
};
export type UserLocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserLocationScalarWhereWithAggregatesInput | Prisma.UserLocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserLocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserLocationScalarWhereWithAggregatesInput | Prisma.UserLocationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"UserLocation"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"UserLocation"> | number;
    locationId?: Prisma.IntWithAggregatesFilter<"UserLocation"> | number;
};
export type UserLocationCreateInput = {};
export type UserLocationUncheckedCreateInput = {
    id?: number;
    userId: number;
    locationId: number;
};
export type UserLocationUpdateInput = {};
export type UserLocationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserLocationCreateManyInput = {
    id?: number;
    userId: number;
    locationId: number;
};
export type UserLocationUpdateManyMutationInput = {};
export type UserLocationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserLocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type UserLocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    locationId?: boolean;
}, ExtArgs["result"]["userLocation"]>;
export type UserLocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    locationId?: boolean;
}, ExtArgs["result"]["userLocation"]>;
export type UserLocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    locationId?: boolean;
}, ExtArgs["result"]["userLocation"]>;
export type UserLocationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    locationId?: boolean;
};
export type UserLocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "locationId", ExtArgs["result"]["userLocation"]>;
export type UserLocationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserLocationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserLocationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserLocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserLocation";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        location: Prisma.$LocationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        locationId: number;
    }, ExtArgs["result"]["userLocation"]>;
    composites: {};
};
export type UserLocationGetPayload<S extends boolean | null | undefined | UserLocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserLocationPayload, S>;
export type UserLocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserLocationCountAggregateInputType | true;
};
export interface UserLocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserLocation'];
        meta: {
            name: 'UserLocation';
        };
    };
    findUnique<T extends UserLocationFindUniqueArgs>(args: Prisma.SelectSubset<T, UserLocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserLocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserLocationFindFirstArgs>(args?: Prisma.SelectSubset<T, UserLocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserLocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserLocationFindManyArgs>(args?: Prisma.SelectSubset<T, UserLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserLocationCreateArgs>(args: Prisma.SelectSubset<T, UserLocationCreateArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserLocationCreateManyArgs>(args?: Prisma.SelectSubset<T, UserLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserLocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserLocationDeleteArgs>(args: Prisma.SelectSubset<T, UserLocationDeleteArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserLocationUpdateArgs>(args: Prisma.SelectSubset<T, UserLocationUpdateArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserLocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserLocationUpdateManyArgs>(args: Prisma.SelectSubset<T, UserLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserLocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserLocationUpsertArgs>(args: Prisma.SelectSubset<T, UserLocationUpsertArgs<ExtArgs>>): Prisma.Prisma__UserLocationClient<runtime.Types.Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserLocationCountArgs>(args?: Prisma.Subset<T, UserLocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserLocationCountAggregateOutputType> : number>;
    aggregate<T extends UserLocationAggregateArgs>(args: Prisma.Subset<T, UserLocationAggregateArgs>): Prisma.PrismaPromise<GetUserLocationAggregateType<T>>;
    groupBy<T extends UserLocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserLocationGroupByArgs['orderBy'];
    } : {
        orderBy?: UserLocationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserLocationFieldRefs;
}
export interface Prisma__UserLocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserLocationFieldRefs {
    readonly id: Prisma.FieldRef<"UserLocation", 'Int'>;
    readonly userId: Prisma.FieldRef<"UserLocation", 'Int'>;
    readonly locationId: Prisma.FieldRef<"UserLocation", 'Int'>;
}
export type UserLocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where: Prisma.UserLocationWhereUniqueInput;
};
export type UserLocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where: Prisma.UserLocationWhereUniqueInput;
};
export type UserLocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where?: Prisma.UserLocationWhereInput;
    orderBy?: Prisma.UserLocationOrderByWithRelationInput | Prisma.UserLocationOrderByWithRelationInput[];
    cursor?: Prisma.UserLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserLocationScalarFieldEnum | Prisma.UserLocationScalarFieldEnum[];
};
export type UserLocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where?: Prisma.UserLocationWhereInput;
    orderBy?: Prisma.UserLocationOrderByWithRelationInput | Prisma.UserLocationOrderByWithRelationInput[];
    cursor?: Prisma.UserLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserLocationScalarFieldEnum | Prisma.UserLocationScalarFieldEnum[];
};
export type UserLocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where?: Prisma.UserLocationWhereInput;
    orderBy?: Prisma.UserLocationOrderByWithRelationInput | Prisma.UserLocationOrderByWithRelationInput[];
    cursor?: Prisma.UserLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserLocationScalarFieldEnum | Prisma.UserLocationScalarFieldEnum[];
};
export type UserLocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserLocationCreateInput, Prisma.UserLocationUncheckedCreateInput>;
};
export type UserLocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserLocationCreateManyInput | Prisma.UserLocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserLocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    data: Prisma.UserLocationCreateManyInput | Prisma.UserLocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserLocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserLocationUpdateInput, Prisma.UserLocationUncheckedUpdateInput>;
    where: Prisma.UserLocationWhereUniqueInput;
};
export type UserLocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserLocationUpdateManyMutationInput, Prisma.UserLocationUncheckedUpdateManyInput>;
    where?: Prisma.UserLocationWhereInput;
    limit?: number;
};
export type UserLocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserLocationUpdateManyMutationInput, Prisma.UserLocationUncheckedUpdateManyInput>;
    where?: Prisma.UserLocationWhereInput;
    limit?: number;
};
export type UserLocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where: Prisma.UserLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserLocationCreateInput, Prisma.UserLocationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserLocationUpdateInput, Prisma.UserLocationUncheckedUpdateInput>;
};
export type UserLocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
    where: Prisma.UserLocationWhereUniqueInput;
};
export type UserLocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserLocationWhereInput;
    limit?: number;
};
export type UserLocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserLocationSelect<ExtArgs> | null;
    omit?: Prisma.UserLocationOmit<ExtArgs> | null;
};
export {};
