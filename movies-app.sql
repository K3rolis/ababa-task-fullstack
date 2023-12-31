PGDMP         2                {        
   movies-app    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17642 
   movies-app    DATABASE     �   CREATE DATABASE "movies-app" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Lithuanian_Lithuania.1257';
    DROP DATABASE "movies-app";
                postgres    false                        2615    18247    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    18828    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    18849    movies    TABLE     G  CREATE TABLE public.movies (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "imageUrl" text NOT NULL,
    description text NOT NULL,
    "releasedYear" integer NOT NULL,
    rating numeric(4,2) NOT NULL,
    title text NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public.movies;
       public         heap    postgres    false    5            �            1259    18848    movies_id_seq    SEQUENCE     �   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public          postgres    false    218    5                       0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
          public          postgres    false    217            �            1259    18838    users    TABLE     )  CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "hashedRt" text,
    username text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    18837    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216    5                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            r           2604    18852 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            p           2604    18841    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            
          0    18828    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   �                 0    18849    movies 
   TABLE DATA           s   COPY public.movies (id, "createdAt", "imageUrl", description, "releasedYear", rating, title, "userId") FROM stdin;
    public          postgres    false    218   
                 0    18838    users 
   TABLE DATA           d   COPY public.users (id, "createdAt", "updatedAt", email, password, "hashedRt", username) FROM stdin;
    public          postgres    false    216   ]#                  0    0    movies_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.movies_id_seq', 5, true);
          public          postgres    false    217                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    215            u           2606    18836 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            z           2606    18857    movies movies_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
       public            postgres    false    218            x           2606    18846    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            v           1259    18847    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            postgres    false    216            {           2606    18858    movies movies_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.movies DROP CONSTRAINT "movies_userId_fkey";
       public          postgres    false    218    216    3192            
     x�}��j�1������p�%ٖ�{�,�] M����s��������ϧ#���[�4�[bOf(���ע$��%[����u�g��B���03Ĥ��Df�Tǐ1���C@J )��G�G�E��~��
5g`��p:\vO߮��< �z�����'y$�j����K��ZM��&ỊM��2�k��4Ѣ�sץ1��+l1Dq��MW@��UPf�O|˙��ƈ����<��G�`V����͜r�9qo�,��\@�D��S���ZևWǘe"���q���Q,f�JhӸs�f��O|`��ޡ,?�loq����t�᜷����o���ʍ(w��\D��\�jI�WW-�6v�l>[��ڠV{gv�ѤI4ӹJC�g�!�^V��}B$ ��A F�cΕ�d/�g�X?�=*f�U(�#Р���o&n-'�P����sM�w��P
��J����lj�kW�V�4� �2��,���cT�?�LY��mo˥��6�/v������|�GJ�7����~�Fc �         C  x����r�6E��W`7I�DQO����=q<.K�+�l@�I�
 ��|}. y2�*�H�M����qo��'�t1MY:ZN&��<Y\��*��e�KJ|�g������a����Όk�_n����y7�v%F���]�ܔ�����[+}�g�t���\����,�q�3_���3�.�3�Q�q�e��!+�i{6���1oX!��Z��ێq���[���o��ɳ��^��7ns��[_%lUK�Iȩ�B,[{�L�����}x�hOJQ�9�ԁ>��H��j���ŝ�ظ����Ő�Cn:�Je2�o��kH4�5\T��Y�?a�ZX�e����-����a2 ��!<�w~��-�%�ʇ��8��8�W|O:	MO{��(�]Y"�yot6�Q�e:N����bh+�E�����6���d����*�a�M�E���=��B"��<i/�o�+�>kuN6rR�q�*ل�����A`��� = �Y�)ľ�x0V �~VdC����b�Kk�8u������<��_��ϯov�a%ԟoW��έk���C}��^C���A*��0��/��Dh줾�TȠ�B����:�:o��SȺU�c�%.�}�[�;꼴���@me�~?*�[�FU _��!�� ��Wq�c�	��5� Gf���cp��q�Bp�"1�9&Q�=}M��X._bI筥(�1�p��V{�]���x��	J�����~�f�,��ڏm[��1�t�~�J���nv�O�>��uqt.!�r��MF6���Y�2
c�Cs�6f!@����Q�Z���r�)��e�(2A-�gZj�۹¬d��@��@�Ѕ�',��(���a��?` \w��Gn1��I�*·�B?$p"�H&��������@H��t�*�r�wz��,7�Ÿ1����l���M�3p'T�A~��`޷Ʊ΄ +���\յ07�8k$H��ѵ�m�M&ˁ��3[�u	{�Ъ�#��0��]Z	��޼5ZS�V����KO��a��H�&���sc	#qQ�G:����DeL0r��iy�y�3�9�]ݿ�4:�?@��OGG��Z����M����3���         �   x�]˹�0  ��(-*8�녷�ąC)
Ū������%O� �H���������_Gz�#�d�E�<H��w*E��`((@0b�!�/q�M��ܵ[���å7��-�ʴ�5' �c�1��/�f�D�nigMׇ�w������v��ؼ�������+��O��K�E���I�y��<     