export const CustomPosLayoutComponent = () => {
  return (
    <>
      <div className="h-full min-h-[60vh] grow overflow-auto bg-[#F5F5F5]">
        <div className="grid h-[85vh] grid-cols-5">
          <div className="col-span-3">
            <PosRegister
              // formValues={formValues}
              // setFormValues={setFormValues}
              // products={products}
              // setProducts={setProducts}
              // productUnits={productUnits}
              // setProductUnits={setProductUnits}
              form={posForm}
              fields={errorFields}
              setGrandTotal={setGrandTotal}
              type={type}
              setType={setType}
            />
          </div>

          <div className="relative col-span-2 flex h-[90vh] flex-col">
            <div className="top-0 z-50 flex w-full items-center justify-between bg-white px-5 shadow-md">
              <div className="flex items-center gap-6 text-2xl">
                <Button
                  className="flex items-center justify-center rounded-full border border-none p-0 text-[20px]"
                  type="text"
                  icon={<GiHamburgerMenu />}
                  onClick={() => setCollapsed(!collapsed)}
                ></Button>
                <Logo />
              </div>
              <div>
                {mode === 'local' && (
                  <Tag color="processing" className="font-semibold">
                    {mode.toUpperCase()} MODE
                  </Tag>
                )}

                {isDev.toLowerCase() === 'true' && (
                  <Tag color="purple" className="font-semibold">
                    DEV MODE
                  </Tag>
                )}
              </div>
              <Profile />
            </div>

            <Filter
              posForm={posForm}
              products={products}
              setProducts={setProducts}
              setFormValues={setFormValues}
              // setProductUnits={setProductUnits}
            />
          </div>
        </div>
      </div>

      <Footer
        style={{
          textAlign: 'center',
        }}
        className="py-4"
      >
        <CustomPaymentComponent />
      </Footer>
    </>
  );
};
